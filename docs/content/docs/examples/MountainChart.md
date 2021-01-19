---
sidebarDepth: 3
title: Mountain Chart
---

```vue
<template>
	<div class="container">
		<h2>Mountain Chart</h2>
		<mountain-chart
			chart-id="mountainChart"
			styles="margin:0 auto;"
			type="mountain"
			ref="mountainChart"
			@init="init"
			:options="options"
			style="width: 100%; height: 600px; margin: 0 auto"
		/>
	</div>
</template>

<script>
import { MountainChart } from 'vue-scichart'

export default {
	name: 'MountainChartExample',
	components: {
		MountainChart
	},
	data: () => ({
		options: {
			modifiers: {
				zoomExtents: {
					isEnabled: true
				},
				mouseWheelZoom: {
					isEnabled: true
				},
				rubberBandXyZoom: {
					fill: '#228B2255',
					stroke: '#228B22CC',
					strokeThickness: 3
				}
			},
			mountainChartOptions: {
				stroke: '#4682b4',
				strokeThickness: 5,
				zeroLineY: 0.0,
				fill: 'rgba(176, 196, 222, 0.7)'
			},
			xAxes: {
				axisAlignment: 'Top',
				axisTitle: 'X-Axis'
			},
			yAxes: {
				axisAlignment: 'Left',
				axisTitle: 'Y-Axis',
				growBy: [0.05, 0.05]
			}
		}
	}),
	methods: {
		init() {
			const {
				appendData,
				getDataSeries,
				zoomExtents
			} = this.$refs.mountainChart

			const POINTS = 1000
			const STEP = (3 * Math.PI) / POINTS

			for (let i = 0; i <= 1000; i++) {
				appendData(i, Math.abs(Math.sin(i * STEP)))
			}

			zoomExtents()
		}
	}
}
</script>
```