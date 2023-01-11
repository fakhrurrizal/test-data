/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_nodules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_nodules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      color: {
        orange: "#FCE4D6",
        biru: "#4472C4",
      }
    },
    fontFamily:{
      avanir: ["montserrat", "sans-serif"],
    }
  },
  plugins: [],
}
)