/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './libraries/*/components/*.{tsx}',
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        120: '480px',
        125: '500px',
        160: '640px',
        180: '720px',
        200: '800px',
      },
      height: {
        140: '560px',
        150: '600px',
        160: '640px',
      },
      maxHeight: {
        140: '560px',
        150: '600px',
        160: '640px',
      },
    },
  },
  plugins: [],
};
