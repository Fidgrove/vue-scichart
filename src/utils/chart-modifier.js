import { ZoomPanModifier } from 'scichart/Charting/ChartModifiers/ZoomPanModifier';
import { ZoomExtentsModifier } from 'scichart/Charting/ChartModifiers/ZoomExtentsModifier';
import { MouseWheelZoomModifier } from 'scichart/Charting/ChartModifiers/MouseWheelZoomModifier';
import { RubberBandXyZoomModifier } from 'scichart/Charting/ChartModifiers/RubberBandXyZoomModifier';
import { LegendModifier } from 'scichart/Charting/ChartModifiers/LegendModifier';
import { CursorModifier } from 'scichart/Charting/ChartModifiers/CursorModifier';
import { RolloverModifier } from 'scichart/Charting/ChartModifiers/RolloverModifier';
import { EXyDirection } from 'scichart/types/XyDirection';

export const importedModifiers = {
  zoomPan: {
    lib: (options = {}) => new ZoomPanModifier(setOptions(options)),
  },

  zoomExtents: {
    lib: (options = {}) => new ZoomExtentsModifier(setOptions(options)),
  },

  mouseWheelZoom: {
    lib: (options = {}) => new MouseWheelZoomModifier(setOptions(options)),
  },

  rubberBandXyZoom: {
    lib: (options = {}) => new RubberBandXyZoomModifier(setOptions(options)),
  },

  legend: {
    lib: (options = {}) => new LegendModifier(setOptions(options)),
  },

  cursor: {
    lib: (options = {}) => new CursorModifier(setOptions(options)),
  },

  rollover: {
    lib: (options = {}) => new RolloverModifier(setOptions(options)),
  },
};

/**
 * options for each modifier need to import a specific library, for example, xyDirection
 * @param  {} opts
 */

async function setOptions(opts) {
  if (!opts) return;

  if (opts.xyDirection) {
    opts = { ...opts, xyDirection: await EXyDirection[opts.xyDirection] };
  }

  return opts;
}

/**
 * @param  {} opt
 * @param  {} sciChartSurface
 */

export default function(opt, sciChartSurface) {
  if (!Object.keys(opt.modifiers).length) return;

  let modifiers = {};

  for (const modifier in opt.modifiers) {
    if (modifier in importedModifiers) {
      const { lib } = importedModifiers[modifier];

      modifiers[modifier] = lib(opt.modifiers[modifier]);

      if (
        opt.modifiers[modifier] &&
        opt.modifiers[modifier].rolloverLineStroke
      ) {
        modifiers[modifier].rolloverLineStroke =
          opt.modifiers[modifier].rolloverLineStroke;
      }

      if (
        opt.modifiers[modifier] &&
        opt.modifiers[modifier].rolloverModifierProps
      ) {
        modifiers[modifier].rolloverModifierProps =
          opt.modifiers[modifier].rolloverModifierProps;
      }

      sciChartSurface.chartModifiers.add(modifiers[modifier]);
    }
  }

  return modifiers;
}
