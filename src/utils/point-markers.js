export const markers = {
  ellipse: {
    key: 'EllipsePointMarker',
    path: import('scichart/Charting/Visuals/PointMarkers/EllipsePointMarker'),
  },
};

export default function setPointMarker(
  wasmContext,
  pointMarkerOptions = {},
  pointType = ''
) {
  if (!wasmContext) throw new Error('Please set a X and Y Axes');

  if (!pointMarkerOptions) throw new Error('Please set a X and Y Axes');

  if (!pointType)
    throw new Error(
      'Please provide your Point marker, it can be Ellipse, Square, Polygon or Custom one'
    );

  const { key, path } = markers[pointType];

  return path.then((m) => new m[key](wasmContext, pointMarkerOptions));
}
