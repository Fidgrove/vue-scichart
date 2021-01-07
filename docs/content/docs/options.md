---
sidebarDepth: 1
title: Options
---

<logo-sponsor style="margin-top: 3em" />

# Options

Here we will have several options. They're important on how we're gonna build our graphics. Options will be an object, and you should pass those properties:

- **modifiers**
- **annotations**
- **xAxes**
- **yAxes**
- **lineChartOptions**
- **bandChartOptions**
- **bubbleChartOptions**
- **columnChartOptions**
- **ohlcChartOptions**
- **heatmapChartOptions**
- **mountainChartOptions**
- **scatterChartOptions**
- **stackedMountainChartOptions**

And you will render on your component like this:

```vue{24-32}
<template>
  <div class="container">
    <h2>Simple Line Chart</h2>
    <line-chart
      chart-id="lineChartSimple"
      type="line"
      ref="lineChartSimple"
      @init="init"
      :options="options"
      style="width: 100%; height: 600px; margin: 0 auto"
    />
  </div>
</template>

<script>
import { LineChart } from 'vue-scichart';

export default {
  name: 'SimpleLineChart',
  components: {
    LineChart,
  },
  data: () => ({
    options: {
      lineChartOptions: {
        stroke: '#ff6600',
        strokeThickness: 5,
      },
      xAxes: {
        growBy: [0.01, 0.01],
      },
    },
  }),
};
</script>
```

## options.modifiers

- Type: `Object`
- Default: `() => {}`

This represents all chart interactions (they're defined as ChartModifiers) you can do on your chart.

```js

options: {
  modifiers: {
    zoomPan: {} // this is refering to ZoomPanModifier, you can check more on scichart documentation which options you can pass
    zoomExtents: {} // this is refering to ZoomExtentsModifier, you can check more on scichart documentation which options you can pass
    mouseWheelZoom: {} // this is refering to MouseWheelZoomModifier, you can check more on scichart documentation which options you can pass
    rubberBandXyZoom: {} // this is refering to RubberBandXyZoomModifier, you can check more on scichart documentation which options you can pass
    legend: {} // this is refering to LegendModifier, you can check more on scichart documentation which options you can pass
    cursor: {} // this is refering to CursorModifier, you can check more on scichart documentation which options you can pass
    rollover: {} // this is refering to RolloverModifier, you can check more on scichart documentation which options you can pass
  }
}

```

- [ZoomPanModifier](https://www.scichart.com/documentation/js/current/typedoc/classes/zoompanmodifier.html)
- [ZoomExtentsModifier](https://www.scichart.com/documentation/js/current/typedoc/classes/zoomextentsmodifier.html)
- [MouseWheelZoomModifier](https://www.scichart.com/documentation/js/current/typedoc/classes/mousewheelzoommodifier.html)
- [RubberBandXyZoomModifier](https://www.scichart.com/documentation/js/current/typedoc/classes/rubberbandxyzoommodifier.html)
- [LegendModifier](https://www.scichart.com/documentation/js/current/typedoc/classes/legendmodifier.html)
- [CursorModifier](https://www.scichart.com/documentation/js/current/typedoc/classes/cursormodifier.html)
- [RolloverModifier](https://www.scichart.com/documentation/js/current/typedoc/classes/rollovermodifier.html)

if we only want to add a ZoomPanModifier we only need to add this option:

```js

options: {
  modifiers: {
    zoomPan: {
      isEnabled: true
    }
  }
}

```

::: warning

Maybe some modifier is missing, this is under development

:::

## options.annotations

- Type: `Object`
- Default: `() => {}`

You can add annotations, markers or shapes are drawn over the tops of your Scichart. the properties for the options are each element you going to use. They can be:

```js

options: {
  annotations: {
    line, // this is refering to LineAnnotation, you can check more on scichart documentation which options you can pass
    box, // this is refering to BoxAnnotation, you can check more on scichart documentation which options you can pass
    text, // this is refering to TextAnnotation, you can check more on scichart documentation which options you can pass
    custom, // this is refering to CustomAnnotation, you can check more on scichart documentation which options you can pass
  }
}

```

- [LineAnnotation](https://www.scichart.com/documentation/js/current/typedoc/classes/lineannotation.html)
- [BoxAnnotation](https://www.scichart.com/documentation/js/current/typedoc/classes/boxannotation.html)
- [TextAnnotation](https://www.scichart.com/documentation/js/current/typedoc/classes/textannotation.html)
- [CustomAnnotation](https://www.scichart.com/documentation/js/current/typedoc/classes/customannotation.html)

Getting the object [**from the first example**](https://www.scichart.com/documentation/js/current/webframe.html#Tutorial%2006%20-%20Adding%20Annotations.html), we will create the same LineAnnotation:

```js

options: {
  annotations: {
    line: {
      x1: 1,
      x2: 2,
      y1: 3,
      y2: 4,
      fill: '#FF000077',
      stroke: '#FF0000',
    }
  }
}

```

::: warning

Maybe some annotation is missing, this is under development

:::

## options.xAxes || options.yAxes

- Type: `Object`
- Default: `() => { type: 'numeric' }`

With this options you can create single/multiple X, Y Axis for your graphics.

::: danger Attention

If you need to specify which type of Axis you want, just pass as an option:<p> **type: `numeric` || `category`**</p>
Category are for Stock Charts (like Ohlc) and Numeric for the others

:::

The options can be:

```js
options: {
  // xAxes or yAxes, it's the same
  xAxes: {
    // growBy and visibleRange will have a minimum and a max, you just need to pass an array like [0.1, 0.2]
    growBy,
    visibleRange,
    // axisAlignment can be only top, right, bottom, left strings.
    axisAlignment,
  }
}
```

::: warning

Maybe some x/yAxes is missing, this is under development

:::

## options.[type]ChartOptions

- Type: `Object`
- Default: `() => {}`

<p>The <strong>"[type]"</strong> mentioned on heading above will be the type of chart you want to renderize. For example, we want to create a <code>line</code> chart so the options you need to pass to this options are <code>lineChartOptions</code>.</p>
<p>I took this approach because for each type of chart, you can have different renderableSeries options. We can change the colors, or even the line thickness for example in each specific chart, and we will notice this approach more when we have to use several charts at the same time.</p>
<p>These options will be assigned to the chart at the time we are assigning what date we want to use on our chart.</p>
Example:

```js{4-5,12-13}
options: {
  lineChartOptions: {
    // some times color have 6 numbers, if you check that have more than 6, don't be surprised, it means the opacity of the color!
    stroke: '#ff6600',
    strokeThickness: 5,
  }
}

// This will be the same as:

const lineSeries = new FastLineRenderableSeries(wasmContext, {
  stroke: "#ff6600",
  strokeThickness: 5
});

```

::: warning

Some Charts / ChartOptions are missing, this is under development

:::
