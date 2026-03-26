import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Azul Bebê
        blue: {
          100: '#B8D9F0',
          300: '#7FBDE0',
          500: '#5BA4CF',
          700: '#2E7AB0',
        },
        // Lilás
        lilac: {
          100: '#EAD5F5',
          300: '#C99EE8',
          500: '#A96DD9',
          700: '#7C3DAF',
        },
        // Rosa / Rosa Choque
        pink: {
          100: '#FFD6E7',
          300: '#FF9DC5',
          500: '#FF69B4',
          700: '#C9356A',
        },
        // Neutros
        neutral: {
          50: '#FAFAFA',
          100: '#F0F0F5',
          500: '#6B6B80',
          900: '#1A1A2E',
        },
        // Dark mode
        dark: {
          bg: '#0D1B2A',
          card: '#1B2838',
          border: '#2A3A4E',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(169, 109, 217, 0.12)',
        'card-hover': '0 4px 20px rgba(169, 109, 217, 0.2)',
      },
      spacing: {
        '4.5': '18px',
        '13': '52px',
        '15': '60px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'floatUp 1.2s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pop': 'pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-60px)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '80%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
