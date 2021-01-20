---
sidebarDepth: 3
title: Scatter Chart
---

```vue
<template>
	<div class="container">
		<h2>Scatter Chart</h2>
		<scatter-chart
			chart-id="scatterChart"
			styles="margin:0 auto;"
			type="scatter"
			ref="scatterChart"
			@init="init"
			:options="options"
			style="width: 100%; height: 600px; margin: 0 auto"
		/>
	</div>
</template>

<script>
import { ScatterChart } from 'vue-scichart'

export default {
	name: 'ScatterChartExample',
	components: {
		ScatterChart
	},
	data: () => ({
		options: {
			modifiers: {
				zoomPan: {
					isEnabled: true
				},
				zoomExtents: {
					isEnabled: true
				},
				mouseWheelZoom: {
					isEnabled: true
				}
			},
			scatterChartOptions: {
				key: 'ellipse',
				pointMarker: {
					width: 7,
					height: 7,
					strokeThickness: 1,
					fill: 'steelblue',
					stroke: 'LightSteelBlue'
				}
			},
			yAxes: {
				growBy: [0.05, 0.05]
			}
		}
	}),
	methods: {
		init() {
			const { appendData, zoomExtents } = this.$refs.scatterChart

			for (let i = 0; i < 100; i++) {
				appendData(i, Math.sin(i * 0.1))
			}

			zoomExtents()
		}
	}
}
</script>
```