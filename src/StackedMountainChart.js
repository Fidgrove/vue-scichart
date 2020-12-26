import { StackedMountainRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/StackedMountainRenderableSeries';
import { StackedMountainCollection } from 'scichart/Charting/Visuals/RenderableSeries/StackedMountainCollection';

import BaseChart from './utils';
import renderSeries from './utils/render-series';

export default {
  extends: BaseChart,
  data: () => ({
    stackedMountainSeries: null,
  }),
  async mounted() {
    await this.init(false);

    /* 	this.$data.stackedMountainSeries = this.setStackedMountainRenderableSeries({
			dataSeries: this.$data._dataSeries,
			...this.mergedOptions.stackedMountainChartOptions
		})

		this.renderChart(this.$data.stackedMountainSeries) */

    this.$emit('init');
  },
  methods: {
    setStackedMountainRenderableSeries(opts = {}) {
      return new StackedMountainRenderableSeries(this.$data._wasmContext, opts);
    },

    renderAll(...args) {
      const stackedMountainCollection = new StackedMountainCollection(
        this.$data._wasmContext
      );

      stackedMountainCollection.isOneHundredPercent = true;
      stackedMountainCollection.add(...args);

      this.renderChart(stackedMountainCollection);
    },
  },
};
