module.exports = {
  // plugins: [
  //   // require('postcss-import'),
  //   require('tailwindcss'),
  //   require('autoprefixer'),
  // ]
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
