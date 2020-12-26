import { FastColumnRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastColumnRenderableSeries';

import BaseChart from './utils';
import { createGradient } from './utils/palette-factory';

export default {
  extends: BaseChart,
  data: () => ({
    columnSeries: null,
  }),
  async mounted() {
    await this.init(false);

    this.$data.columnSeries = this.setFastColumnRenderableSeries({
      dataSeries: this.$data._dataSeries,
      ...this.mergedOptions.columnChartOptions,
    });

    this.renderChart(this.$data.columnSeries);

    this.$data.columnSeries.createGradient = createGradient(
      this.$data._wasmContext
    );

    this.$emit('init');
  },
  methods: {
    setFastColumnRenderableSeries(opts = {}) {
      return new FastColumnRenderableSeries(this.$data._wasmContext, opts);
    },
  },
};
