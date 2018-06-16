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
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        },
        // images
        {
          test: /\.(jpe?g|png|bmp|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
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
            { loader: 'style-loader', options: { sourceMap: true } },
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1 }
            },
            { loader: 'postcss-loader', options: { sourceMap: true } }
          ]
        },
        // js
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        // ejs
        {
          test: /\.ejs$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].html'
              }
            },
            'extract-loader',
            'html-loader',
            {
              loader: 'ejs-html-loader',
              options: {
                mode: argv.mode
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
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
