import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: '#E8542A',
        'coral-light': '#f07550',
        dark: '#0d0d0d',
        'dark-section': '#111111',
        'dark-footer': '#080808',
        offwhite: '#f7f5f0',
        mid: '#8a8070',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
