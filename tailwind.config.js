/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: '#F5F5F5', // Add a custom name like "lavender"
        danfe : '#173c41',
        custom : '#E2F3E4',
        primarya0 : '#d5ee1b',
        primarya10 : '#dbf046',
        primarya20 : '#e1f263',
        primarya30 : '#e7f47b',
        primarya40 : '#ecf692',
        primarya50 : '#f1f7a9',

        // Surface Colors
        surfacea0 :  '#121212',
        surfacea10 : '#303030',
        surfacea20 : '#3f3f3f',
        surfacea30 : '#575757',
        surfacea40 : '#717171',
        surfacea50 : '#8b8b8b',

        // Tonal Surface Colors
        surfacetonala0: '#232418',
        surfacetonala10: '#38382d',
        surfacetonala20 : '#4e4e44',
        surfacetonala30 : '#64655c',
        surfacetonala40 : '#7c7d75',
        surfacetonala50 : '#95958f',
      },
     },
  },
  plugins: [
    require('daisyui'),
  ],
};
