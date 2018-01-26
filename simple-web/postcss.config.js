const options = {
  postcssImport: {
    path: 'src/styles'
  },
  cssnext: {
    browsers: ['last 2 versions', 'IE >= 11', 'iOS >= 11', 'Android >= 5.0'],
    cascade: false
  }
}

module.exports = ctx => ({
  map: ctx.env === 'production' ? false : ctx.options.map,
  plugins: {
    'postcss-import': options.postcssImport,
    'postcss-cssnext': options.cssnext,
    csswring: ctx.env === 'production'
  }
})
