const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");

module.exports = {
  open: false,
  notify: false,
  port: 3000,
  reloadDelay: 300,
  ghostMode: false,
  server: {
    baseDir: filePath.dist.root,
    middleware: [
      webpackDevMiddleware(webpackBundler, {
        publicPath: webpackConfig.output.publicPath,
        // noInfo: true,
        // quiet: true,
        stats: {
          colors: true
        }
      }),
      webpackHotMiddleware(webpackBundler)
    ]
  }
};
