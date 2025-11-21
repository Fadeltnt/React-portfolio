module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Emilio Thin', 'Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
        display: ['MHTIROGLA', 'sans-serif'],
        body: ['Emilio Thin', 'sans-serif'],
      },
      colors: {
        nothing: {
          red: '#D71921',
          black: '#000000',
          dark: '#1C1C1E',
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}