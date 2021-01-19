---
sidebarDepth: 3
title: Band Chart
---

```vue
<template>
	<div class="container">
		<h2>Band Chart</h2>
		<band-chart
			chart-id="bandChart"
			styles="margin:0 auto;"
			type="band"
			ref="bandChart"
			@init="init"
			:options="options"
			style="width: 100%; height: 600px; margin: 0 auto"
		/>
	</div>
</template>

<script>
import { BandChart } from 'vue-scichart'

export default {
	components: {
		BandChart
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
			bandChartOptions: {
				strokeThickness: 2,
				fill: '#279B2733',
				fillY1: '#FF191933',
				stroke: '#FF1919FF',
				strokeY1: '#279B27FF'
			}
		}
	}),
	methods: {
		init() {
			const { appendData } = this.$refs.bandChart

			const POINTS = 1000
			const STEP = (3 * Math.PI) / POINTS

			for (let i = 0; i <= 1000; i++) {
				const k = 1 - i / 2000
				appendData(i, Math.sin(i * STEP) * k * 0.7, Math.cos(i * STEP) * k)
			}
		}
	}
}
</script>
```