import { setPoint, setGradientParams } from './core';

const setCreateGradient = (wasmContext, opts = {}) => {
  if (!wasmContext) throw new Error('Please set a X and Y Axes');

  if (!opts) return;

  return import(
    'scichart/Charting/Model/PaletteFactory'
  ).then(({ PaletteFactory }) =>
    PaletteFactory.createGradient(wasmContext, opts)
  );
};

const setCreateColorMap = (wasmContext, opts = {}) => {
  if (!wasmContext) throw new Error('Please set a X and Y Axes');

  if (!opts) return;

  return import(
    'scichart/Charting/Model/PaletteFactory'
  ).then(({ PaletteFactory }) =>
    PaletteFactory.createColorMap(wasmContext, opts)
  );
};

export function createGradient(wasmContext) {
  /**
   *
   * Creates gradient brush params
   *
   * @param  { Array } startPoint [x,y] Array start X and Y i.e [0,0]
   * @param  { Array } endPoint [x,y] Array start X and Y i.e [1,1]
   * @param  { Array } gradientParamsArr : TGradientStop[] 2 or more gradient stop point with color
   *
   */

  return async function(startPoint, endPoint, gradientParamsArr) {
    startPoint = await setPoint(startPoint[0], startPoint[1]);
    endPoint = await setPoint(endPoint[0], endPoint[1]);

    const gradient = await setGradientParams(
      startPoint,
      endPoint,
      gradientParamsArr
    );

    this.paletteProvider = await setCreateGradient(wasmContext, gradient);
  };
}
