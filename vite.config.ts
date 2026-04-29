import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { ANIMALS, BLOG_POSTS } from './src/constants';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      includedRoutes: () => [
        '/', 
        '/puxadas', 
        '/blog', 
        ...ANIMALS.map(a => '/puxadas/' + a.slug), 
        ...BLOG_POSTS.map(p => '/blog/' + p.slug), 
        '/noticias', 
        ...BLOG_POSTS.map(p => '/noticias/' + p.slug)
      ],
      onFinished: () => {
        // Build complete
      },
    },
  };
});
