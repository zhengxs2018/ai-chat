import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import pkg from './package.json';

const isDev = import.meta.env.DEV;

const externals = Object.keys(pkg.dependencies).filter((name) => {
  return name !== 'astro' && name.startsWith('@ai-chat') === false;
});

export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: isDev
    ? node({ mode: 'standalone' })
    : deno({
        hostname: 'localhost',
        port: 2320,
      }),
  ssr: {
    noExternal: ['vditor'],
  },
  vite: {
    plugins: [
      {
        name: 'esm-sh-plugin',
        enforce: 'pre',
        resolveId(source) {
          if (import.meta.env.DEV) return;

          if (externals.includes(source)) {
            return {
              external: true,
              id: `https://esm.sh/${source}`,
            };
          }
        },
      },
    ],
  },
});
