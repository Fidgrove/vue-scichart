const setPoint = (x, y) => {
  if (x === undefined || y === undefined)
    throw new Error(
      '[vue-scichart.js] - define X point or Y point to Point class - https://www.scichart.com/documentation/js/current/typedoc/classes/point.html'
    );

  return import('scichart/Core/Point').then((m) => new m.Point(x, y));
};

const setGradientParams = (startPoint, endPoint, gradientStops) => {
  if (startPoint === undefined || endPoint === undefined)
    throw new Error(
      '[vue-scichart.js] - x and y values should be from 0 to 1, 0 - https://www.scichart.com/documentation/js/current/typedoc/classes/gradientparams.html'
    );

  if (!gradientStops) {
    throw new Error(
      '[vue-schichart.js] - 2 or more gradient stop point with color - https://www.scichart.com/documentation/js/current/typedoc/classes/gradientparams.html'
    );
  }

  return import('scichart/Core/GradientParams').then(
    (m) => new m.GradientParams(startPoint, endPoint, gradientStops)
  );
};

export { setPoint, setGradientParams };
