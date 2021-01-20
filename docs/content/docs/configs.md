---
sidebarDepth: 3
title: Component Attributes
---

<logo-sponsor style="margin-top: 3em" />

# Component Attributes

For each schichart graphic, you need to import the specific chart you want to use, at the moment you can import on your component these charts (each of them have the link to each specific demo):

::: warning TODO

This is on continuous development, if you not see the chart you need, you can contribute to the project

:::

- [LineChart](https://demo.scichart.com/javascript-line-chart)
- [BandChart](https://demo.scichart.com/javascript-band-chart)
- [BubbleChart](https://demo.scichart.com/javascript-bubble-chart)
- [ColumnChart](https://demo.scichart.com/javascript-candlestick-chart)
- [OhlcChart](https://demo.scichart.com/javascript-ohlc-chart)
- [HeatmapChart](https://demo.scichart.com/javascript-heatmap-chart)
- [MountainChart](https://demo.scichart.com/javascript-mountain-chart)
- [ScatterChart](https://demo.scichart.com/javascript-scatter-chart)
- [StackedMountainChart](https://demo.scichart.com/javascript-stacked-mountain-chart)

You can check how to implement each one on [Chart Examples Dropdown on Sidebar](examples/LineChart)


## **Chart-id**

- Type: `String`
- Default: `"chart"`
- Required: true

Any chart you will renderize need an id

::: warning TODO

If you need any method from scichart and if the plugin is not wrapping that, we will need to get the component. We prefer to user `ref` instead of `chart-id` 
but we only use because we follow the tutorials by scichart team

:::

```vue

<template>
  <div>
    <line-chart 
      chart-id="lineChart" 
    />
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

## **Type**

- Type: `String`
- Default: `['line', 'column', 'band', 'bubble', 'ohlc', 'heatmap', 'mountain','scatter', 'stackedMountain']`
- Required: true

The `type` will be very important, with this we will draw the chart by his type and where we going to store our data. Better explanation [here](https://www.scichart.com/documentation/js/current/webframe.html#Tutorial%2002%20-%20Adding%20Series%20and%20Data.html)

::: warning TODO

Some graphics are not on wrapper yet, we will update the docs when each chart is ready.

:::

```vue

<template>
  <div>
    <line-chart 
      chart-id="lineChart"
      type="line" 
    /> 
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

## **Init**

- Type: `Function`
- Default: `() => {}`

This method is where you going to append the data you need to pass, doing all the modifiers, pass all options and render the chart as you want to show.

```vue

<template>
  <div>
    <line-chart 
      chart-id="lineChart"
      type="line" 
      @init="myInitMethod"
    /> 
  </div>
</template>

<script>

import { LineChart } from 'vue-scichart'

export default {
  components: {
    LineChart
  },
  methods: {
    myInitMethod() {
      // your code
    }
  }
}

</script>

```

Next page we will explain how we pass options on our component