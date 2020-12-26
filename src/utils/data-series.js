export const charts = {
	line: {
		key: 'XyDataSeries',
		path: import('scichart/Charting/Model/XyDataSeries')
	},
	band: {
		key: 'XyyDataSeries',
		path: import('scichart/Charting/Model/XyyDataSeries')
	},
	bubble: {
		key: 'XyzDataSeries',
		path: import('scichart/Charting/Model/XyzDataSeries')
	},
	ohlc: {
		key: 'OhlcDataSeries',
		path: import('scichart/Charting/Model/OhlcDataSeries')
	},
	heatmap: {
		key: 'UniformHeatmapDataSeries',
		path: import('scichart/Charting/Model/UniformHeatmapDataSeries')
	}
}

charts.column = charts.line
charts.mountain = charts.line
charts.scatter = charts.line
charts.stackedMountain = charts.line

export default function setDataSeries(typeOfChart, wasmContext, opts = {}) {
	if (!typeOfChart || !charts[typeOfChart])
		throw new Error('[vue-scichart.js] - Please provide the type of the chart')

	if (!wasmContext)
		throw new Error(
			'[vue-scichart.js] - Please provide webAssemblyContext know as "wasmContext"'
		)

	const { path, key } = charts[typeOfChart]
	return path.then((m) => {
		if (Array.isArray(opts)) {
			return new m[key](wasmContext, ...opts)
		}

		return new m[key](wasmContext, opts)
	})
}
