// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lingohive.fun',
  integrations: [
    react(),
    sitemap(),
  ],
  output: 'static',
  build: {
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});