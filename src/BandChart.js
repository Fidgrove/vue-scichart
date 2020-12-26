import { FastBandRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastBandRenderableSeries';

import BaseChart from './utils';
import { createGradient } from './utils/palette-factory';

export default {
  extends: BaseChart,
  data: () => ({
    bandSeries: null,
  }),
  async mounted() {
    await this.init(false);

    this.$data.bandSeries = this.setFastBandRenderableSeries({
      dataSeries: this.$data._dataSeries,
      ...this.mergedOptions.bandChartOptions,
    });

    this.renderChart(this.$data.bandSeries);

    this.$data.bandSeries.createGradient = createGradient(
      this.$data._wasmContext
    );

    this.$emit('init');
  },
  methods: {
    setFastBandRenderableSeries(opts = {}) {
      return new FastBandRenderableSeries(this.$data._wasmContext, opts);
    },
  },
};
