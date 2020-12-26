import { FastMountainRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastMountainRenderableSeries'

import BaseChart from './utils'

export default {
	extends: BaseChart,
	data: () => ({
		mountainSeries: null
	}),
	async mounted() {
		await this.init(false)

		this.$data.mountainSeries = this.setFastMountainRenderableSeries({
			dataSeries: this.$data._dataSeries,
			...this.mergedOptions.mountainChartOptions
		})

		this.renderChart(this.$data.mountainSeries)

		this.$emit('init')
	},
	methods: {
		setFastMountainRenderableSeries(opts = {}) {
			return new FastMountainRenderableSeries(this.$data._wasmContext, opts)
		}
	}
}
