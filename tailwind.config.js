/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: '#F5F5F5', // Add a custom name like "lavender"
        danfe : '#173c41',
        custom : '#E2F3E4'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
