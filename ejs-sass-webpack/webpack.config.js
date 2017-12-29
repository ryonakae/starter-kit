const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");

// common config
const common = {
  entry: path.join(__dirname, "src/scripts/index.js"),

  output: {
    path: path.join(__dirname, "dist/scripts"),
    filename: "index.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    alias: {
      "@": path.join(__dirname, "src/scripts")
    }
  }
};

// development config
const dev = {
  entry: ["webpack-hot-middleware/client?noinfo=true&quiet=true"],

  output: {
    publicPath: "/"
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  cache: true,
  devtool: "inline-source-map"
};

// production config
const prod = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      comments: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};

// exports
module.exports = merge(
  common,
  process.env.NODE_ENV === "production" ? prod : dev
);
