import { FastBubbleRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastBubbleRenderableSeries';

import BaseChart from './utils';
import setPointMarker from './utils/point-markers';

export default {
  extends: BaseChart,
  data: () => ({
    bubbleSeries: null,
  }),
  async mounted() {
    await this.init(false);

    this.$data.bubbleSeries = await this.setFastBubbleRenderableSeries({
      dataSeries: this.$data._dataSeries,
      ...this.mergedOptions.bubbleChartOptions,
    });

    this.renderChart(this.$data.bubbleSeries);

    this.$emit('init');
  },
  methods: {
    async setFastBubbleRenderableSeries(opts = {}) {
      return new FastBubbleRenderableSeries(this.$data._wasmContext, {
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
