import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './docs/**/*.{md,mdx}',
  ],
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Primary — SyteOps brand teal palette (anchored on plugin --sf-primary).
        primary: {
          50:  '#EEF8F9',
          100: '#D6ECEF',
          200: '#A8D5DC',
          300: '#7DBBC5',
          400: '#4DA1AE',
          500: '#2D9CB0',
          600: '#0F6F7E',
          700: '#0A5260',
          800: '#074049',
          900: '#052E35',
          950: '#03191D',
        },
        // Accent — SyteWide parent-brand blue family.
        accent: {
          50:  '#EEF2FB',
          400: '#5B7CD9',
          500: '#3354A8',
          600: '#1E3A8A',
        },
        surface: {
          0: 'var(--so-surface-0)',
          50: 'var(--so-surface-50)',
          100: 'var(--so-surface-100)',
          200: 'var(--so-surface-200)',
          300: 'var(--so-surface-300)',
        },
        text: {
          primary: 'var(--so-text-primary)',
          secondary: 'var(--so-text-secondary)',
          tertiary: 'var(--so-text-tertiary)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', '"Cascadia Code"', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'card-hover':
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        glass: '0 8px 32px 0 rgb(31 38 135 / 0.07)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        fadeInUp: {
          '0%': {opacity: '0', transform: 'translateY(20px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
        slideInLeft: {
          '0%': {opacity: '0', transform: 'translateX(-20px)'},
          '100%': {opacity: '1', transform: 'translateX(0)'},
        },
      },
    },
  },
  plugins: [],
};

export default config;
