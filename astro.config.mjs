import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import { version } from './package.json';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  ssr: {
    noExternal: ['vditor'],
  },
  site: 'https://ai.zhengxs.cn',
  build: {
    assetsPrefix: `https://cdn.zhengxs.cn/ai/${version}`,
  },
});
