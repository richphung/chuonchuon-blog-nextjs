import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cute & Professional Mint Palette 🌿
        primary: {
          50: '#f0fdfa',    // Lightest mint - backgrounds
          100: '#ccfbf1',   // Super light mint
          200: '#99f6e4',   // Light mint
          300: '#5eead4',   // Soft mint
          400: '#2dd4bf',   // Medium mint
          500: '#14b8a6',   // Main mint (teal-500)
          600: '#0d9488',   // Rich mint
          700: '#0f766e',   // Deep mint
          800: '#115e59',   // Dark mint
          900: '#134e4a',   // Darkest mint
        },
        // Warm grays for professional feel
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Cute accent colors 🎨
        accent: {
          coral: {
            light: '#fecdd3',
            DEFAULT: '#fb7185',
            dark: '#e11d48',
          },
          lavender: {
            light: '#e9d5ff',
            DEFAULT: '#c084fc',
            dark: '#9333ea',
          },
          peach: {
            light: '#fed7aa',
            DEFAULT: '#fb923c',
            dark: '#ea580c',
          },
          sky: {
            light: '#bae6fd',
            DEFAULT: '#38bdf8',
            dark: '#0284c7',
          },
        },
        // Background colors
        'mint-light': '#f0fdfa',
        'mint-soft': '#ccfbf1',
        'cream': '#fefce8',
        'blush': '#fff1f2',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'Courier New',
          'Courier',
          'monospace',
        ],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
