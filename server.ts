import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import * as cheerio from "cheerio";
import rateLimit from "express-rate-limit"; // SECURITY FIX: Added rate limiting

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // SECURITY FIX: Rate limiting for API routes
  const apiLimiter = rateLimit({
    windowMs: 60000, // 1 minute
    max: 20, // Limit each IP to 20 requests per windowMs
    message: { error: "Too many requests from this IP, please try again after a minute." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use("/api", apiLimiter); // SECURITY FIX: Apply rate limiting to all /api routes

  // API Route for scraping Jogo do Bicho results
  app.get("/api/results", async (req, res) => {
    try {
      // SECURITY FIX: Added timeout, maxRedirects and status validation
      const response = await axios.get("https://www.bichodasorte.com.br/resultados/rj/", {
        timeout: 8000, // SECURITY FIX: 8s timeout
        maxRedirects: 2, // SECURITY FIX: Limit redirects
        validateStatus: (status) => status === 200, // SECURITY FIX: Only allow 200 OK
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      });

      // SECURITY FIX: Validate content type
      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.includes('text/html')) {
        throw new Error("Invalid content type received");
      }

      const $ = cheerio.load(response.data);
      const results: any[] = [];

      // Find all result sections
      $("div.col-md-12").each((_, element) => {
        const title = $(element).find("h6").first().text().trim();
        const date = $(element).find("h6").eq(1).text().trim();
        
        if (title && title.includes("-RJ")) {
          const numbers: any[] = [];
          $(element).find("div.row").each((idx, row) => {
            const value = $(row).find("h4").eq(1).text().trim();
            const group = $(row).find("h4").eq(2).text().trim();
            const animal = $(row).find("h4").eq(3).text().trim();
            
            if (value && animal) {
              numbers.push({
                position: idx + 1,
                value,
                group,
                animal
              });
            }
          });

          if (numbers.length > 0) {
            results.push({
              id: title.replace(/\s+/g, '-').toLowerCase(),
              name: title,
              date: date || new Date().toLocaleDateString('pt-BR'),
              numbers
            });
          }
        }
      });

      res.json(results);
    } catch (error) {
      // SECURITY FIX: Generic error message for client
      console.error("Scraping error:", error);
      res.status(500).json({ error: "Failed to fetch results. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the dist directory in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Fallback to index.html for SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
