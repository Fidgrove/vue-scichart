import { FastOhlcRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastOhlcRenderableSeries';

import BaseChart from './utils';

export default {
  extends: BaseChart,
  data: () => ({
    ohlcSeries: null,
  }),
  async mounted() {
    await this.init();

    /* this.$data.ohlcSeries = this.setFastOhlcRenderableSeries({
			dataSeries: this.$data._dataSeries,
			...this.mergedOptions.ohlcChartOptions
		})

		this.renderChart(this.$data.ohlcSeries)

		this.$data.ohlcSeries.createGradient = createGradient(
			this.$data._wasmContext
		) */

    /* this.$emit('init') */
  },
  methods: {
    setFastOhlcRenderableSeries(opts = {}) {
      return new FastOhlcRenderableSeries(this.$data._wasmContext, opts);
    },
  },
};
