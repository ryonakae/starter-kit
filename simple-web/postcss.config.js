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

const ENV = process.env.NODE_ENV

module.exports = ctx => ({
  map: ENV === 'production' ? false : ctx.options.map,
  plugins: {
    'postcss-import': options.postcssImport,
    'postcss-preset-env': options.postcssPresetEnv,
    csswring: ENV === 'production'
  }
})
