const options = {
  postcssImport: {
    path: 'src/styles'
  },
  cssnext: {
    browsers: ['last 2 versions', 'ie > 11', 'iOS >= 11', 'Android >= 5.0'],
    cascade: false
  },
  cssnano: {
    preset: 'default',
    autoprefixer: false,
    zindex: false,
    discardUnused: {
      fontFace: false
    }
  }
}

module.exports = ctx => ({
  map: ctx.env === 'production' ? false : ctx.options.map,
  plugins: {
    'postcss-import': options.postcssImport,
    'postcss-cssnext': options.cssnext,
    cssnano: ctx.env === 'production' ? options.cssnano : false
  }
})
