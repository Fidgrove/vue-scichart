---
sidebarDepth: 3
title: Heatmap Chart
---

```vue
<template>
	<div class="container">
		<h2>Heatmap Chart</h2>
		<heatmap-chart
			chart-id="heatmapChart"
			styles="margin:0 auto;"
			type="heatmap"
			ref="heatmapChart"
			@init="init"
			:options="options"
			style="width: 100%; height: 600px; margin: 0 auto"
		/>
	</div>
</template>

<script>
import { HeatmapChart } from 'vue-scichart'
import { zeroArray2D } from 'scichart/utils/zeroArray2D' // next time will change this to include on vue-scichart

export default {
	name: 'OhlcChartExample',
	components: {
		HeatmapChart
	},
	data: () => ({
		width: 300,
		height: 20,
		maxSeries: 20,
		options: {
			heatmapChartOptions: {
				colorMap: {
					minimum: 0,
					maximum: 200,
					gradientStops: [
						{ offset: 0, color: '#00008B' },
						{ offset: 0.2, color: '#6495ED' },
						{ offset: 0.4, color: '#006400' },
						{ offset: 0.6, color: '#7FFF00' },
						{ offset: 0.8, color: '#FFFF00' },
						{ offset: 1.0, color: '#FF0000' }
					]
				}
			}
		}
	}),
	methods: {
		async init() {
			const {
				appendData,
				getDataSeries,
				setUniformHeatmapRenderableSeries,
				renderChart
			} = this.$refs.heatmapChart

			const initialZValues = this.iterate(
				this.width,
				this.height,
				200,
				0,
				this.maxSeries
			)

			const dataSeries = await getDataSeries('heatmap', {
				dataSeries: [100, 1, 100, 1, initialZValues]
			})

			const heatMapSeries = await setUniformHeatmapRenderableSeries({
				...this.options.heatmapChartOptions,
				dataSeries
			})

			renderChart(heatMapSeries)
		},

		iterate(width, height, cpMax, index, maxIndex) {
			const zValues = zeroArray2D([height, width])

			const angle = this.roundTo(Math.PI * 2 * index, 3) / maxIndex

			for (let x = 0; x < width; x++) {
				for (let y = 0; y < height; y++) {
					const v =
						(1 + this.roundTo(Math.sin(x * 0.04 + angle), 3)) * 50 +
						(1 + this.roundTo(Math.sin(y * 0.1 + angle), 3)) *
							50 *
							(1 + this.roundTo(Math.sin(angle * 2), 3))
					const cx = width / 2
					const cy = height / 2
					const r = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy))
					const exp = Math.max(0, 1 - r * 0.008)
					const zValue = v * exp + Math.random() * 50

					zValues[y][x] = zValues > cpMax ? cpMax : zValue
				}
			}

			return zValues
		},

		roundTo(number, digits) {
			return parseFloat(number.toFixed(digits))
		}
	}
}
</script>
```