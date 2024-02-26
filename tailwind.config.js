/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      'sm': '18px',
      'base': '16px',
      'lg': '24px',
    },
    fontFamily: {
      'sans': ['Open Sans'],
    },
    extend: {
      colors: {
        'primary': '#FFD700',
        'secondary': '#FFA500',
        'danger': '#FF0000',
        'success': '#008000',
        'info': '#00BFFF',
        'warning': '#FFA500',
        'dark': '#1d1f20',
        'light': '#f7f7f7',
      },
    },
  },
  plugins: [],
}

