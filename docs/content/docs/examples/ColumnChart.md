---
sidebarDepth: 3
title: Column Chart
---

```vue
<template>
	<div class="container">
		<h2>Column Chart</h2>
		<column-chart
			chart-id="columnChart"
			styles="margin:0 auto;"
			ref="columnChart"
			type="column"
			@init="init"
			:options="options"
			style="width: 100%; height: 600px; margin: 0 auto"
		/>
	</div>
</template>

<script>
import { ColumnChart } from '../../SciChart'

export default {
	name: 'ColumnChartExample',
	components: {
		ColumnChart
	},
	data: () => ({
		arr: [
			0.1,
			0.2,
			0.4,
			0.8,
			1.1,
			1.5,
			2.4,
			4.6,
			8.1,
			11.7,
			14.4,
			16.0,
			13.7,
			10.1,
			6.4,
			3.5,
			2.5,
			1.4,
			0.4,
			0.1
		],
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
			columnChartOptions: {
				fill: 'rgba(176, 196, 222, 0.5)',
				stroke: 'rgba(176, 196, 222, 1)',
				strokeThickness: 2,
				dataPointWidth: 0.7
			},
			yAxes: {
				growBy: [0, 0.1]
			}
		}
	}),
	methods: {
		async init() {
			const {
				appendData,
				zoomExtents
			} = this.$refs.columnChart

			for (let i = 0; i < this.arr.length; i++) {
				appendData(i, this.arr[i])
			}

      zoomExtents()
		}
	}
}
</script>
```