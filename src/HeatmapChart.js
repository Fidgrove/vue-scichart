import { UniformHeatmapRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/UniformHeatmapRenderableSeries';

import BaseChart from './utils';
import renderSeries from './utils/render-series';

export default {
  extends: BaseChart,
  data: () => ({
    heatmapSeries: null,
  }),
  async mounted() {
    await this.init();
  },
  methods: {
    async setUniformHeatmapRenderableSeries(opts = {}) {
      if (!opts.colorMap)
        throw new Error(
          '[vue-scichart] - Options needed to pass colorMap Option with a minimum, maximum and gradientStops'
        );

      return new UniformHeatmapRenderableSeries(this.$data._wasmContext, {
        ...opts,
        colorMap: await renderSeries(
          'heatColorMap',
          this.$data._wasmContext,
          opts.colorMap
        ),
      });
    },
  },
};
