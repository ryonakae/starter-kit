const ENV = process.env.NODE_ENV

module.exports = (ctx) => ({
  map: ENV === 'production' ? false : ctx.options.map,
  plugins: {
    'postcss-import': {
      path: 'src/styles'
    },
    'postcss-preset-env': {
      stage: 2,
      features: {
        'custom-media-queries': true,
        'nesting-rules': true
      }
    },
    csswring: ENV === 'production'
  }
})
