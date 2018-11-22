const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const mozjpeg = require('imagemin-mozjpeg')
const TerserPlugin = require('terser-webpack-plugin')

const MODE = process.env.NODE_ENV === void 0 ? 'development' : 'production'
const DEV_MODE = MODE === 'development'

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
      // js
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // css
      {
        test: /\.css$/,
        use: [
          DEV_MODE
            ? {
                loader: 'style-loader',
                options: {
                  sourceMap: true
                }
              }
            : MiniCssExtractPlugin.loader,
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
      // images
      {
        test: /\.(jpe?g|png|bmp|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      // fonts
      {
        test: /\.(otf|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CopyWebpackPlugin([
      {
        from: './static',
        to: './',
        ignore: ['.DS_Store', '.gitkeep']
      }
    ]),
    new ImageminPlugin({
      disable: DEV_MODE,
      test: /\.(jpe?g|png|bmp|gif|svg)$/,
      jpegtran: null,
      pngquant: {
        quality: '80-90',
        speed: 1,
        floyd: 0
      },
      optipng: null,
      gifsicle: {
        interlaced: false
      },
      svgo: {
        plugins: [{ removeViewBox: false }]
      },
      plugins: [
        mozjpeg({
          quality: 85,
          progressive: true
        })
      ]
    })
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
    minimizer: DEV_MODE
      ? []
      : [
          new TerserPlugin({
            parallel: true,
            sourceMap: false,
            terserOptions: {
              warnings: false,
              compress: {
                drop_console: true
              }
            }
          })
        ]
  },

  devtool: DEV_MODE ? 'inline-source-map' : 'none',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true
  }
}
