import { FastLineRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastLineRenderableSeries';

import BaseChart from './utils';
import { createGradient } from './utils/palette-factory';

export default {
  extends: BaseChart,
  data: () => ({
    lineSeries: null,
  }),
  async mounted() {
    await this.init(false);

    this.$data.lineSeries = this.setFastLineRenderableSeries({
      dataSeries: this.$data._dataSeries,
      ...this.mergedOptions.lineChartOptions,
    });

    this.renderChart(this.$data.lineSeries);

    this.$data.lineSeries.createGradient = createGradient(
      this.$data._wasmContext
    );

    this.$emit('init');
  },

  methods: {
    setFastLineRenderableSeries(opts = {}) {
      return new FastLineRenderableSeries(this.$data._wasmContext, opts);
    },
  },
};
