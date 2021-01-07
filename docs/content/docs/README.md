<p align="center">
<img src="/img/vue-scichart_logo@2x.png" alt="logo" width="400px" style="margin: 6em 0;" />
</p>

<logo-sponsor />

# **vue-scichart**

Vue plugin for using Scichart

## Why should I use it?

This plugin isn't just a wrapper of the Scichart API, but provides a better solution on importing modules you need to use in certain charts and have a faster option method you can just pass and you done need to create.

## Requirements

Vue ^2.0.0

## Install

```sh
# npm
npm install vue-scichart --save

# yarn
yarn add vue-scichart
```

## Usage

vue-scichart can be used as a vue directive from your javascript. **We should pass the key of Scichart** as well. You can use form a ```.env``` file for example.

```js{4-6,8}
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

```sh
npm install write-file-webpack-plugin@4.5.1 --save-dev 
npm install copy-webpack-plugin@6.4.1 --save-dev
```

on **vue.config.js**:

```js{2,3,9-33}
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

After change our **vue.config.js** file we can on main Vue file, in my case will be on `main.js`

```js

import Vue from 'vue';
import App from './App.vue';
import scichart from 'vue-scichart';

Vue.config.productionTip = false;

Vue.use(scichart, {
  key: process.env.VUE_APP_SCICHART_KEY, // I'm using .env
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');


```

After we can use on our component as we need

```vue

<template>
  <div>
    <line-chart />
  </div>
</template>

<script>

import { LineChart } from 'vue-scichart'

export default {
  components: {
    LineChart
  }
}

</script>

```

More about which chart we can import and use, check our docs, on [Component Attributes](/content/docs/configs.md)

