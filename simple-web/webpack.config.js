const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const MODE = process.env.WEBPACK_SERVE ? 'development' : 'production'
const IS_DEV = MODE === 'development'

module.exports = {
  mode: MODE,
  context: path.join(__dirname, 'src'),
  entry: {
    index: './scripts/index.js'
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
          name: '[path][name].[ext]'
        }
      },
      // images
      {
        test: /\.(jpe?g|png|bmp|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: IS_DEV,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }
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
          'html-loader',
          {
            loader: 'ejs-html-loader',
            options: {
              mode: MODE
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
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src/static'),
        to: './',
        ignore: ['.DS_Store', '.gitkeep']
      }
    ])
  ],
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
