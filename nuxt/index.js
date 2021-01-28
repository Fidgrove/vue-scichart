import * as path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = function module(moduleOptions) {
  const options = this.options.key || moduleOptions;

  const {
    rootDir,
    generate: { dir: generateDir },
  } = this.nuxt.options;

  const fileName = 'scichart2d.data';

  const sourceDir = path.join(
    rootDir,
    '/node_modules/scichart/_wasm/scichart2d.data'
  );

  const endFile = readFileSync(sourceDir);

  this.options.build.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(
            rootDir,
            'node_modules/scichart/_wasm/scichart2d.wasm'
          ),
          to: '',
        },
      ],
    })
  );

  // TODO: Need to import .data/.wasm and check js for 2d and 3d

  this.extendBuild((config) => {
    config.module.rules.push(
      ...[
        {
          test: /\.data$/,
          loader: 'file-loader',
        },
        {
          test: /\.wasm$/,
          type: 'javascript/auto',
          loader: 'file-loader',
        },
      ]
    );

    config.resolve.alias['../../_wasm/scichart2d$'] = path.resolve(
      rootDir,
      'node_modules',
      'scichart',
      '_wasm',
      'scichart2d.js'
    );
  });

  this.nuxt.hook('render:setupMiddleware', () => {
    this.nuxt.server.useMiddleware({
      path: fileName,
      handler(req, res) {
        res.setHeader('Content-Type', 'application/octet-stream');
        res.end(endFile);
      },
    });
  });

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
