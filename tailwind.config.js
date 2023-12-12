/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/components/*.{jsx,js}",
  "./src/components/MenuItem.{jsx,js}",
  './src/pages/*.{js,ts,jsx,tsx}', 
  './src/App.jsx',
  './src/main.jsx',
  './src/pages/Home.jsx',
  './src/pages/*',
  './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}'
],
  theme: {
    extend: {},
  },
  plugins: []
}

