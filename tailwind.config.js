/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          taupe: '#4B4237',
          goldenrod: '#052B39',
          ocean: '#052B39',
          linen: '#EDE7D9',
          rosy: '#A49694',
          dimGrey: '#736B60',
        },
        brand: {
          accent: '#052B39',
          accentHover: '#031E28',
          accentLight: 'rgba(5, 43, 57, 0.12)',
          dark: '#4B4237',
          // Light mode warm linen surfaces
          lightBg: '#EDE7D9',
          lightSurface: '#FAF7F2',
          lightCard: '#FFFFFF',
          lightBorder: 'rgba(164, 150, 148, 0.35)',
          lightText: '#4B4237',
          lightMuted: '#736B60',
          // Pure OLED Black + warm taupe dark mode
          blackBg: '#000000',
          blackSurface: '#0E0D0C',
          blackCard: '#171513',
          blackBorder: 'rgba(164, 150, 148, 0.22)',
          blackText: '#EDE7D9',
          blackMuted: '#A49694',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        khmer: ['Kantumruy Pro', 'Battambang', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'clean': '0 1px 3px 0 rgba(5, 43, 57, 0.06), 0 1px 2px -1px rgba(5, 43, 57, 0.04)',
        'clean-md': '0 4px 6px -1px rgba(5, 43, 57, 0.08), 0 2px 4px -2px rgba(5, 43, 57, 0.06)',
        'clean-lg': '0 10px 15px -3px rgba(5, 43, 57, 0.10), 0 4px 6px -4px rgba(5, 43, 57, 0.08)',
      }
    },
  },
  plugins: [],
}
