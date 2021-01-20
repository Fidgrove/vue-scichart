---
sidebarDepth: 3
title: Ohlc Chart
---

```vue
<template>
	<div class="container">
		<h2>Ohlc Chart</h2>
		<ohlc-chart
			chart-id="ohlcChart"
			styles="margin:0 auto;"
			type="ohlc"
			ref="ohlcChart"
			@init="init"
			:options="options"
			style="width: 100%; height: 600px; margin: 0 auto"
		/>
	</div>
</template>

<script>
import {
	dataValues,
	openValues,
	highValues,
	lowValues,
	closeValues
} from './data/index'

/**
 * 
 * If you want to use dummy data, you can import from their repository, here: 
 * https://github.com/ABTSoftware/SciChart.JS.Examples/tree/master/Examples/src/components/Examples/Charts2D/BasicChartTypes/OhlcChart/data
 * 
*/

import { OhlcChart } from 'vue-scichart'

export default {
	name: 'OhlcChartExample',
	components: {
		OhlcChart
	},
	data: () => ({
		dataValues,
		openValues,
		highValues,
		lowValues,
		closeValues,
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
				},
				rollover: {
					isEnabled: false
				}
			},
			ohlcChartOptions: {
				strokeThickness: 3,
				dataPointWidth: 0.5,
				strokeUp: '#50ff50',
				strokeDown: '#ff5050'
			},
			xAxes: {
				type: 'category',
				growBy: [0.05, 0.05]
			},
			yAxes: {
				visibleRange: [1.1, 1.2],
				growBy: [0.1, 0.1]
			}
		}
	}),
	methods: {
		async init() {
			const {
				appendData,
				getDataSeries,
				setFastOhlcRenderableSeries,
				renderChart,
				zoomExtents
			} = this.$refs.ohlcChart

			const dataSeries = await getDataSeries('ohlc', {
				dataSeries: {
					xValues: this.dataValues,
					openValues: this.openValues,
					highValues: this.highValues,
					lowValues: this.lowValues,
					closeValues: this.closeValues
				}
			})

			const ohlcSeries = setFastOhlcRenderableSeries({
				...this.options.ohlcChartOptions,
				dataSeries
			})

			renderChart(ohlcSeries)

			zoomExtents()
		}
	}
}
</script>
```