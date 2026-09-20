/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        kora: {
          bg: '#F7F6F2',
          accent: '#FF5C35',
          'accent-hover': '#E8522F',
          text: '#1A1A1A',
          muted: '#6B6B6B',
          border: '#EBEAE5',
          chip: '#FFF0EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 28px rgba(0, 0, 0, 0.08)',
        panel: '0 20px 50px rgba(0, 0, 0, 0.06)',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
}
