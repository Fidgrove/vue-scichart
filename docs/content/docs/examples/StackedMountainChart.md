---
sidebarDepth: 3
title: Stacked Mountain Chart
---

```vue
<template>
	<div class="container">
		<h2>Stacked Mountain Chart</h2>
		<stacked-mountain-chart
			chart-id="stackedMountainChart"
			styles="margin:0 auto;"
			type="stackedMountain"
			ref="stackedMountainChart"
			@init="init"
			:options="options"
			style="width: 100%; height: 600px; margin: 0 auto"
		/>
	</div>
</template>

<script>
import { StackedMountainChart } from 'vue-scichart'
import { xValues, y1Values, y2Values, y3Values } from './data/index'
/**
 * 
 * Same as ohlc, if you want to use dummy data, you can check it here:
 * https://github.com/ABTSoftware/SciChart.JS.Examples/tree/master/Examples/src/components/Examples/Charts2D/BasicChartTypes/StackedMountainChart/data
 * 
*/
import { StackedMountainCollection } from 'scichart/Charting/Visuals/RenderableSeries/StackedMountainCollection'

export default {
	name: 'StackedMountainChartExample',
	components: {
		StackedMountainChart
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
			stackedMountainChartOptions: {},
			yAxes: {
				growBy: [0, 0.1]
			}
		}
	}),
	methods: {
		async init() {
			const {
				appendData,
				getDataSeries,
				zoomExtents,
				setStackedMountainRenderableSeries,
				renderAll,
				renderChart,
				chart: { wasmContext }
			} = this.$refs.stackedMountainChart

			const dataSeries1 = await getDataSeries('stackedMountain', {
				fill: '#939899',
				dataSeries: { xValues, yValues: y1Values }
			})

			const dataSeries2 = await getDataSeries('stackedMountain', {
				fill: '#66838d',
				dataSeries: { xValues, yValues: y2Values }
			})

			const dataSeries3 = await getDataSeries('stackedMountain', {
				fill: '#368BC1',
				dataSeries: { xValues, yValues: y3Values }
			})

			const rendSeries1 = setStackedMountainRenderableSeries()
			const rendSeries2 = setStackedMountainRenderableSeries()
			const rendSeries3 = setStackedMountainRenderableSeries()

			rendSeries1.fill = '#939899'
			rendSeries1.rolloverModifierProps.markerColor = '#7b7e80'
			rendSeries1.rolloverModifierProps.tooltipColor = 'rgba(147,152,153,0.7)'
			rendSeries1.rolloverModifierProps.tooltipTextColor = '#000'
			rendSeries1.dataSeries = dataSeries1

			rendSeries2.fill = '#66838d'
			rendSeries2.rolloverModifierProps.markerColor = '#495d65'
			rendSeries2.rolloverModifierProps.tooltipColor = 'rgba(102,131,141,0.7)'
			rendSeries2.rolloverModifierProps.tooltipTextColor = '#000'
			rendSeries2.dataSeries = dataSeries2

			rendSeries3.fill = '#368BC1'
			rendSeries3.rolloverModifierProps.markerColor = '#2d739e'
			rendSeries3.rolloverModifierProps.tooltipColor = 'rgba(54,139,193,0.7)'
			rendSeries3.rolloverModifierProps.tooltipTextColor = '#000'
			rendSeries3.dataSeries = dataSeries3

			const stackedMountainCollection = new StackedMountainCollection(
				wasmContext
			)

			stackedMountainCollection.isOneHundredPercent = true
			stackedMountainCollection.add(rendSeries1, rendSeries2, rendSeries3)

			renderChart(stackedMountainCollection)

			zoomExtents()
		}
	}
}
</script>
```