---
sidebarDepth: 3
title: Bubble Chart
---

```vue
<template>
	<div class="container">
		<h2>Bubble Chart</h2>
		<bubble-chart
			chart-id="bubbleChart"
			styles="margin:0 auto;"
			ref="bubbleChart"
			type="bubble"
			@init="init"
			:options="options"
			style="width: 100%; height: 600px; margin: 0 auto"
		/>
	</div>
</template>

<script>
import { BubbleChart } from 'vue-scichart'

export default {
	name: 'BubbleChartExample',
	components: {
		BubbleChart
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
			bubbleChartOptions: {
				key: 'ellipse',
				pointMarker: {
					width: 64,
					height: 64,
					strokeThickness: 0,
					fill: '#4682b477'
				}
			},
			yAxes: {
				growBy: [0.05, 0.05]
			}
		}
	}),
	methods: {
		async init() {
			const { appendData, zoomExtents } = this.$refs.bubbleChart

			const POINTS = 20
			let prevYValue = 0
			for (let i = 0; i < POINTS; i++) {
				const curYValue = Math.sin(i) * 10 - 5
				const size = Math.sin(i) * 60 + 3
				appendData(i, prevYValue + curYValue, size)
				prevYValue += curYValue
			}

			zoomExtents()
		}
	}
}
</script>
```