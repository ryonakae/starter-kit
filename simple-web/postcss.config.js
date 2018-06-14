const options = {
  postcssImport: {
    path: 'src/styles'
  },
  postcssPresetEnv: {
    stage: 2,
    features: {
      'custom-media-queries': true,
      'nesting-rules': true
    }
  }
}

module.exports = ctx => ({
  map: ctx.env === 'production' ? false : ctx.options.map,
  plugins: {
    'postcss-import': options.postcssImport,
    'postcss-preset-env': options.postcssPresetEnv,
    csswring: ctx.env === 'production'
  }
})
