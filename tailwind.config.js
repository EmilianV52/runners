/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#f8f9fa',
          border: '#343a40',
          text: '#40916c',
          heading: '#1b4332',
        },
        dark: {
          bg: '#343a40',
          border: '#e9ecef',
          text: '#f0efeb',
        }
      }
    },
  },
  plugins: [],
}
