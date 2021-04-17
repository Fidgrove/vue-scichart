export const render = {
  heatColorMap: {
    key: 'HeatmapColorMap',
    path: import('scichart/Charting/Visuals/RenderableSeries/HeatmapColorMap'),
  },
};

export default function renderSeries(type, wasmContext, opts = {}) {
  if (!type)
    throw new Error('[vue-scichart.js] - Please provide the type of the chart');

  if (!wasmContext)
    throw new Error(
      '[vue-scichart.js] - Please provide webAssemblyContext know as "wasmContext"'
    );

  const { path, key } = render[type];
  return path.then((m) => new m[key](wasmContext, opts));
}
