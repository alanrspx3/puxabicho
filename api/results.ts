import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Rate limiting simples via cache em memória
const requestCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos de cache

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://puxabicho.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/json');

  // Apenas GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar cache
  const cacheKey = 'results';
  const cached = requestCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return res.status(200).json(cached.data);
  }

  try {
    const response = await axios.get(
      'https://www.bichodasorte.com.br/resultados/rj/',
      {
        timeout: 8000,
        maxRedirects: 2,
        validateStatus: (status) => status === 200,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      }
    );

    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error('Invalid content type received');
    }

    const $ = cheerio.load(response.data);
    const results: any[] = [];

    $('div.col-md-12').each((_, element) => {
      const title = $(element).find('h6').first().text().trim();
      const date = $(element).find('h6').eq(1).text().trim();

      if (title && title.includes('-RJ')) {
        const numbers: any[] = [];
        $(element)
          .find('div.row')
          .each((idx, row) => {
            const value = $(row).find('h4').eq(1).text().trim();
            const group = $(row).find('h4').eq(2).text().trim();
            const animal = $(row).find('h4').eq(3).text().trim();

            if (value && animal) {
              numbers.push({
                position: idx + 1,
                value,
                group,
                animal,
              });
            }
          });

        if (numbers.length > 0) {
          results.push({
            id: title.replace(/\s+/g, '-').toLowerCase(),
            name: title,
            date: date || new Date().toLocaleDateString('pt-BR'),
            numbers,
          });
        }
      }
    });

    // Salvar no cache
    requestCache.set(cacheKey, { data: results, timestamp: Date.now() });

    return res.status(200).json(results);
  } catch (error) {
    console.error('Scraping error:', error);
    return res.status(500).json({
      error: 'Failed to fetch results. Please try again later.',
    });
  }
}
