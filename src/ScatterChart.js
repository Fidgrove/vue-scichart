import { XyScatterRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/XyScatterRenderableSeries';

import BaseChart from './utils';
import setPointMarker from './utils/point-markers';

export default {
  extends: BaseChart,
  data: () => ({
    scatterSeries: null,
  }),
  async mounted() {
    await this.init(false);

    this.$data.scatterSeries = await this.setXyScatterRenderableSeries({
      dataSeries: this.$data._dataSeries,
      ...this.mergedOptions.scatterChartOptions,
    });

    this.renderChart(this.$data.scatterSeries);

    this.$emit('init');
  },
  methods: {
    async setXyScatterRenderableSeries(opts = {}) {
      return new XyScatterRenderableSeries(this.$data._wasmContext, {
        pointMarker: await setPointMarker(
          this.$data._wasmContext,
          opts.pointMarker,
          opts.key
        ),
        dataSeries: opts.dataSeries,
      });
    },
  },
};
