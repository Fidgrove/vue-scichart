import { SciChartVerticalGroup } from 'scichart/Charting/LayoutManager/SciChartVerticalGroup';
import { SciChartSurface } from 'scichart/Charting/Visuals/SciChartSurface';
import { SciChartJSDarkTheme } from 'scichart/Charting/Themes/SciChartJSDarkTheme';
import { SciChartJSLightTheme } from 'scichart/Charting/Themes/SciChartJSLightTheme';

import { FastColumnRenderableSeries } from 'scichart/Charting/Visuals/RenderableSeries/FastColumnRenderableSeries';

import setAxes from './parsers';
import setDataSeries from './data-series';
import setChartModifiers from './chart-modifier';
import setAnnotations from './annotations';

const _options = {
  modifiers: {},
  dataSeries: {},
  annotations: {},
  xAxes: {},
  yAxes: {},
  lineChartOptions: {},
  bandChartOptions: {},
  bubbleChartOptions: {},
  columnChartOptions: {},
  ohlcChartOptions: {},
  heatmapChartOptions: {},
  mountainChartOptions: {},
  scatterChartOptions: {},
  stackedMountainChartOptions: {},
};

export default {
  render: function(createElement) {
    return createElement('div', {
      style: this.styles,
      class: this.cssClasses,
      attrs: {
        id: this.chartId,
        width: this.width,
        height: this.height,
      },
    });
  },
  props: {
    chartId: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'dark',
    },
    type: {
      type: String,
      default: '',
    },
    width: {
      default: 600,
      type: Number,
    },
    height: {
      default: 400,
      type: Number,
    },
    styles: {
      type: String,
      default: '',
    },
    cssClasses: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    _series: null,
    _dataSeries: null,
    _modifiers: null,
    _chart: null,
    _wasmContext: null,
    _xAxes: null,
    _yAxes: null,
  }),
  computed: {
    chart() {
      return {
        series: this.$data._series,
        wasmContext: this.$data._wasmContext,
        sciChartSurface: this.$data._chart,
        modifiers: this.$data._modifiers,
        dataSeries: this.$data._dataSeries,
        xAxes: this.$data._xAxes,
        yAxes: this.$data._yAxes,
      };
    },

    mergedOptions() {
      return { ..._options, ...this.$props.options };
    },
  },
  methods: {
    async init(init = true) {
      if (this.$scichart.key) {
        SciChartSurface.setRuntimeLicenseKey(this.$scichart.key);
      } else {
        throw new Error('Need SciChart Key to generate the graphic.');
      }

      const { sciChartSurface, wasmContext } = await SciChartSurface.create(
        this.chartId
      );

      this.applyTheme(sciChartSurface);
      if (this.mergedOptions.scichartBackground)
        sciChartSurface.background = this.mergedOptions.scichartBackground;

      // Create X and Y Axis and added to the chart
      this.$data._xAxes = await setAxes(
        wasmContext,
        this.mergedOptions.xAxes,
        this.mergedOptions.xAxes.type
      );

      this.$data._yAxes = await setAxes(
        wasmContext,
        this.mergedOptions.yAxes,
        this.mergedOptions.yAxes.type
      );

      sciChartSurface.xAxes.add(this.$data._xAxes);
      sciChartSurface.yAxes.add(this.$data._yAxes);

      this.$data._wasmContext = wasmContext;
      this.$data._chart = sciChartSurface;
      this.$data._modifiers = await this.setOptions();

      if (init) {
        this.$emit('init');
      }
    },
    applyTheme(sciChartSurface) {
      switch (this.theme) {
        case 'dark':
          sciChartSurface.applyTheme(new SciChartJSDarkTheme());
          break;
        case 'light':
          sciChartSurface.applyTheme(new SciChartJSLightTheme());
          break;
        default:
          sciChartSurface.applyTheme(new SciChartJSDarkTheme());
          break;
      }
    },
    async setOptions(newOpts = null) {
      const { _wasmContext, _chart } = this.$data;
      const opts = newOpts || this.mergedOptions;

      await this.setDataSeries(opts, _wasmContext);
      setAnnotations(opts, _chart);

      const chartModifiers = setChartModifiers(opts, _chart, _wasmContext);

      return chartModifiers;
    },

    async getDataSeries(type, opts = {}) {
      type = type || this.$props.type;
      if (!type)
        throw new Error('[vue-scichart] - Please provide a Chart Type');
      return await setDataSeries(type, this.$data._wasmContext, opts);
    },

    async setDataSeries(opts = {}, wasmContext, type = '') {
      this.$data._dataSeries = await setDataSeries(
        type ? type : this.$props.type,
        wasmContext || this.$data._wasmContext,
        opts.dataSeries
      );
    },

    setVerticalGroup() {
      return new SciChartVerticalGroup();
    },

    appendData(...args) {
      this.$data._dataSeries.append(...args);
    },

    appendRangeData(xArray, yArray) {
      this.$data._dataSeries.appendRange(xArray, yArray);
    },

    addModifier(modifier) {
      this.$data._chart.chartModifiers.add(modifier);
    },

    updateModifier(key) {
      return this.$data._modifiers[key];
    },

    renderChart(dataSeries) {
      this.$data._chart.renderableSeries.add(dataSeries);
    },

    addNotation(notation) {
      this.$data._chart.annotations.add(notation);
    },

    zoomExtents() {
      this.$data._chart.zoomExtents();
    },

    setColumnChart(opts = {}) {
      return new FastColumnRenderableSeries(this.$data._wasmContext, opts);
    },
  },

  beforeDestroy() {
    if (this.$data._chart) this.$data._chart.delete();
  },
};
