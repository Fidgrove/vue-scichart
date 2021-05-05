import * as path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = async function module(moduleOptions) {
  const options = this.options.scichart || moduleOptions;

  const {
    rootDir,
    generate: { dir: generateDir },
  } = this.nuxt.options;

  const filePath = '/node_modules/scichart/_wasm/';

  const fileName = 'scichart2d.data';

  const sourceDir = path.join(rootDir, filePath, 'scichart2d.data');

  const endFile = readFileSync(sourceDir);

  this.options.build.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(rootDir, filePath, 'scichart2d.wasm'),
          to: '',
        },
      ],
    })
  );

  // TODO: Need to import .data/.wasm and check js for 2d and 3d

  this.extendBuild((config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'javascript/auto',
      loader: 'file-loader',
    });

    config.resolve.alias['../../_wasm/scichart2d$'] = path.resolve(
      rootDir,
      filePath,
      'scichart2d.js'
    );
  });

  const middleware = require('./middleware.js')({ '2dData': endFile });
  this.addServerMiddleware(middleware);

  this.nuxt.hook('generate:done', async () => {
    const generateFilePath = path.resolve(generateDir, fileName);

    await writeFileSync(generateFilePath, endFile);
  });

  this.addPlugin({
    src: path.resolve(__dirname, './templates', 'plugin.js'),
    fileName: 'vue-scichart.js',
    options,
  });
};

module.exports.meta = require('../package.json');
