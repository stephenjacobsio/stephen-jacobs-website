import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', 
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-fira-code)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        gray: {
          750: '#2D3748',
          850: '#1A202C',
        },
        cyan: {
          450: '#2AA7A9',
          550: '#0E7490',
        },
        blue: {
          450: '#3B82F6',
        },
      },
      boxShadow: {
        'subtle': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;