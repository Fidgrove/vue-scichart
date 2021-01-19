---
sidebarDepth: 3
title: Line Chart
---

```vue
<template>
  <div class="container">
    <h2>Simple Line Chart</h2>
    <line-chart
      chart-id="lineChartSimple"
      styles="margin:0 auto;"
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
  components: {
    LineChart,
  },
  data: () => ({
    options: {
      annotations: {
        line: {
          stroke: '#FF6600',
          strokeThickness: 3,
          x1: 1.0,
          x2: 4.0,
          y1: 6.0,
          y2: 9.0,
        },
      },
      lineChartOptions: {
        stroke: '#ff6600',
        strokeThickness: 5,
      },
      modifiers: {
        zoomPan: {
          isEnabled: true,
        },
        mouseWheelZoom: {
          isEnabled: true,
        },
      },
    },
  }),
  methods: {
    init() {
      const { appendData, lineSeries } = this.$refs.lineChartSimple;

      for (let i = 0; i < 100; i++) {
        appendData(i, Math.sin(i * 0.1));
      }

      lineSeries.createGradient(
        [0, 0],
        [1, 1],
        [
          { color: 'red', offset: 0 },
          { color: 'pink', offset: 0.2 },
          { color: 'yellow', offset: 0.5 },
          { color: 'purple', offset: 0.7 },
          { color: 'green', offset: 1 },
        ]
      );
    },
  },
};
</script>
```