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
      path: path.join(__dirname, 'dist')
    },
    module: {
      rules: [
        // fonts
        {
          test: /\.(otf|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 1,
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        },
        // images
        {
          test: /\.(jpe?g|png|bmp|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[ext]',
                outputPath: 'images/'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true,
                mozjpeg: {
                  quality: 85,
                  progressive: true
                },
                pngquant: {
                  quality: '80-90',
                  speed: 1,
                  floyd: 0
                },
                optipng: {
                  enabled: false
                },
                gifsicle: {
                  interlaced: false
                },
                svgo: {
                  plugins: [{ removeViewBox: false }]
                }
              }
            }
          ]
        },
        // css
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        },
        // js
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      alias: {
        '~': path.join(__dirname, 'src')
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
