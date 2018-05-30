const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// common config
module.exports = (env, argv) => {
  const IS_DEV = argv.mode === 'development'

  return {
    entry: {
      index: path.join(__dirname, 'src/scripts/index.js')
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist/scripts')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/scripts')
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true
          }
        }
      },
      minimizer: IS_DEV
        ? []
        : [
          new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_console: true
              },
              comments: false
            }
          })
        ]
    },
    devtool: IS_DEV ? 'inline-source-map' : 'none'
  }
}
