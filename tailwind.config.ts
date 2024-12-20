import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', 
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        gray: {
          750: '#2D3748',
        },
        cyan: {
          450: '#2AA7A9',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;