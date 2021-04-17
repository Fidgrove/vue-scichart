import { NumberRange } from 'scichart/Core/NumberRange';
import { EAutoRange } from 'scichart/types/AutoRange';

export const axisTypes = {
  numeric: {
    key: 'NumericAxis',
    path: import('scichart/Charting/Visuals/Axis/NumericAxis'),
  },
  category: {
    key: 'CategoryAxis',
    path: import('scichart/Charting/Visuals/Axis/CategoryAxis'),
  },
};

/**
 *
 * @param {Array} arr
 */

function setNumberRange(arr) {
  return new NumberRange(...arr);
}

/**
 *
 * @param {*} value
 * @returns Function
 */

function setAlignment(value) {
  if (!value)
    throw new Error(
      '[vue-scichart] - Please provide one of these options: top, right, bottom, left'
    );

  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 *
 * @param {Object} opts
 * @returns
 */

async function parserAxesOptions(opts) {
  if (opts && Object.keys(opts).length === 0 && opts.constructor === Object)
    return;

  if (opts.type) delete opts.type;

  if (opts.autoRange) {
    opts = { ...opts, autoRange: await EAutoRange[opts.autoRange] };
  }

  if (opts.growBy) {
    opts = {
      ...opts,
      growBy: await setNumberRange(opts.growBy),
    };
  }

  if (opts.visibleRange) {
    opts = { ...opts, visibleRange: await setNumberRange(opts.visibleRange) };
  }

  if (opts.axisAlignment) {
    opts = { ...opts, axisAlignment: await setAlignment(opts.axisAlignment) };
  }

  return opts;
}
/**
 * @param  {Object} wasmContext
 * @param  {Object} opts={}
 * @param  {String} type=We will have only 2 types of axis: Category is used for Stock chart app's and Numeric will value axis
 * @returns
 */
export default async function setAxes(
  wasmContext,
  opts = {},
  type = 'numeric'
) {
  if (!wasmContext)
    throw new Error('[vue-scichart.js] - Please set a X and Y Axes');

  const { key, path } = axisTypes[type];

  const newOpts = await parserAxesOptions(opts);

  return path.then((m) => {
    const axisObj = new m[key](wasmContext, newOpts);

    if (newOpts && newOpts.labelProvider) {
      if (newOpts.labelProvider.formatLabel)
        axisObj.labelProvider.formatLabel = (value) =>
          newOpts.labelProvider.formatLabel(value);
    }

    return axisObj;
  });
}
