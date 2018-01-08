const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config");

module.exports = {
  open: false,
  notify: false,
  port: 3000,
  reloadDelay: 300,
  ghostMode: false,
  server: {
    baseDir: "dist",
    middleware: [
      devMiddleware(webpack(config), {
        publicPath: config.output.publicPath,
        // noInfo: true,
        // quiet: true,
        stats: {
          colors: true
        }
      }),
      hotMiddleware(webpack(config))
    ]
  }
};
