import { ZoomPanModifier } from 'scichart/Charting/ChartModifiers/ZoomPanModifier';
import { ZoomExtentsModifier } from 'scichart/Charting/ChartModifiers/ZoomExtentsModifier';
import { MouseWheelZoomModifier } from 'scichart/Charting/ChartModifiers/MouseWheelZoomModifier';
import { RubberBandXyZoomModifier } from 'scichart/Charting/ChartModifiers/RubberBandXyZoomModifier';
import { LegendModifier } from 'scichart/Charting/ChartModifiers/LegendModifier';
import { CursorModifier } from 'scichart/Charting/ChartModifiers/CursorModifier';
import { RolloverModifier } from 'scichart/Charting/ChartModifiers/RolloverModifier';

export const importedModifiers = {
  zoomPan: {
    lib: (options = {}) => new ZoomPanModifier(options),
  },

  zoomExtents: {
    lib: (options = {}) => new ZoomExtentsModifier(options),
  },

  mouseWheelZoom: {
    lib: (options = {}) => new MouseWheelZoomModifier(options),
  },

  rubberBandXyZoom: {
    lib: (options = {}) => new RubberBandXyZoomModifier(options),
  },

  legend: {
    lib: (options = {}) => new LegendModifier(options),
  },

  cursor: {
    lib: (options = {}) => new CursorModifier(options),
  },

  rollover: {
    lib: (options = {}) => new RolloverModifier(options),
  },
};

/**
 * @param  {} opt
 * @param  {} sciChartSurface
 * @param  {} wasmContext
 */

export default function(opt, sciChartSurface) {
  if (!Object.keys(opt.modifiers).length) return;

  let modifiers = {};

  for (const modifier in opt.modifiers) {
    if (modifier in importedModifiers) {
      const { lib } = importedModifiers[modifier];

      modifiers[modifier] = lib(opt.modifiers[modifier]);

      sciChartSurface.chartModifiers.add(modifiers[modifier]);
    }
  }

  return modifiers;
}
