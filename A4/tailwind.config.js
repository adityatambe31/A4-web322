/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.html`,
    "./public/**/*.js",
    `./views/**/*.ejs`,
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: ['cupcake'], // You can customize the theme if you'd like
  },
};