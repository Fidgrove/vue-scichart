# [vue-scichart](https://vigilant-varahamihira-acef60.netlify.app/)

<p align="center">
  <img src="docs/.vuepress/public/img/vue-scichart_logo.svg" alt="Logo" width="400" height="200">
</p>

![npm_version](https://img.shields.io/npm/v/vue-scichart/latest?label=npm&style=flat-square) ![minified](https://img.shields.io/bundlephobia/min/vue-scichart?label=minified&style=flat-square) ![license](https://img.shields.io/npm/l/vue-scichart?style=flat-square) ![collaborators](https://img.shields.io/npm/collaborators/vue-scichart?label=collaborators&style=flat-square)

Vue plugin for using Scichart

[Docs](https://vigilant-varahamihira-acef60.netlify.app/)

# :question: Why sould I use it?

This plugin isn't just a wrapper of the Scichart API, but provides a better solution on importing modules you need to use in certain charts and have a faster option method you can just pass and you done need to create.

# :electric_plug: Install

```powershell
# npm usage
npm install vue-scichart --save

# yarn usage
yarn add vue-scichart
```

# :sparkles: Usage

vue-scichart can be used as a vue directive from your javascript. **We should pass the key of Scichart** as well. You can use form a ```.env``` file for example.

```js
import Vue from 'vue'
import scichart from 'vue-scichart'

const opts = {
  key: process.env.YOUR_SCICHART_KEY
}

Vue.use(scichart, opts)
```

But that's not everything we need. We should get two files before we can start creating new charts. the files are `scichart2d.data` and `scichart2d.wasm` and **they are different on vue/nuxt context**.

### Vue

You should change your *vue config file*, and add `write-file-webpack-plugin` and `copy-webpack-plugin` with specific versions

```powershell
npm install write-file-webpack-plugin@4.5.1 --save-dev 
npm install copy-webpack-plugin@6.4.1 --save-dev
```

on **vue.config.js**:

```js
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new WriteFilePlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              'node_modules/vue-scichart/dist/scichart2d.data'
            ),
            to: path.join(
              __dirname,
              process.env.NODE_ENV === 'production' ? 'dist' : 'public'
            ),
          },
          {
            from: path.join(
              __dirname,
              'node_modules/vue-scichart/dist/scichart2d.wasm'
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
```

## 🤝 Contributing
We are a community effort, and everybody is most welcome to participate!

Be it filing bugs, formulating enhancements, creating pull requests, or any other means of contribution, we encourage contributions from everyone.

## 📝 License
Distributed under the <a href="/LICENSE">MIT license</a>.