import { NumberRange } from 'scichart/Core/NumberRange'
import { EAxisAlignment } from 'scichart/types/AxisAlignment'

export const axisTypes = {
	numeric: {
		key: 'NumericAxis',
		path: import('scichart/Charting/Visuals/Axis/NumericAxis')
	},
	category: {
		key: 'CategoryAxis',
		path: import('scichart/Charting/Visuals/Axis/CategoryAxis')
	}
}

function setNumberRange(arr) {
	new NumberRange(...arr)
}

function setAlignment(value) {
	if (!value)
		throw new Error(
			'[vue-scichart] - Please provide one of these options: top, right, bottom, left'
		)

	const valueCapitalized = value.charAt(0).toUpperCase() + value.slice(1)

	return EAxisAlignment[valueCapitalized]
}

async function parserAxesOptions(opts) {
	if (opts.growBy) {
		opts = { ...opts, growBy: await setNumberRange(opts.growBy) }
	}

	if (opts.visibleRange) {
		opts = { ...opts, visibleRange: await setNumberRange(opts.visibleRange) }
	}

	if (opts.axisAlignment) {
		opts = { ...opts, axisAlignment: await setAlignment(opts.axisAlignment) }
	}

	return opts
}
/**
 * @param  {Object} wasmContext
 * @param  {Object} opts={}
 * @param  {String} type=We will have only 2 types of axis: Category is used for Stock chart app's and Numeric will value axis
 */
export default async function setAxes(
	wasmContext,
	opts = {},
	type = 'numeric'
) {
	if (!wasmContext)
		throw new Error('[vue-scichart.js] - Please set a X and Y Axes')

	const { key, path } = axisTypes[type]

	const newOpts = await parserAxesOptions(opts)

	return path.then((m) => new m[key](wasmContext, newOpts))
}
