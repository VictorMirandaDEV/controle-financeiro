// import Datepicker from '@themesberg/tailwind-datepicker/Datepicker';

module.exports = {
  mode:'jit',
  important: '#__next',
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./.next/**/*.{js,ts,jsx,tsx}",
      "./dist/**/*.{js,ts,jsx,tsx}",
      // "./node_modules/flowbite/**/*.js",
    ],

  theme: {
    extend: {
      colors:{'white': '#ffffff','button-submit':'#00C0FF', 'text-google':'#847D7F', 'gray':"#847D7F"},
      fontFamily:{
       Tw: 'Tw Cen MT, regular',
       TwBold: 'Tw Cen MT, Condensed Extra Bold'
      }
    },
  },
  plugins: [
    // require('flowbite/plugin')
]
}
