const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  lintOnSave: false,
  publicPath: '/dist/',
  css: { extract: false },
  configureWebpack: {
    plugins: [
      new WriteFilePlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              'node_modules/scichart/_wasm/scichart2d.data'
            ),
            to: path.join(
              __dirname,
              process.env.NODE_ENV === 'production' ? 'dist' : 'public'
            ),
          },
          {
            from: path.join(
              __dirname,
              'node_modules/scichart/_wasm/scichart2d.wasm'
            ),
            to: path.join(
              __dirname,
              process.env.NODE_ENV === 'production' ? 'dist/js' : 'public/js'
            ),
          },
        ],
      }),
    ],
  },
};
