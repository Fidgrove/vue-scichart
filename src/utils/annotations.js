export const annotations = {
  // Add Line annotation
  line: {
    key: 'LineAnnotation',
    path: import('scichart/Charting/Visuals/Annotations/LineAnnotation'),
  },
  // Add a box annotation
  box: {
    key: 'BoxAnnotation',
    path: import('scichart/Charting/Visuals/Annotations/BoxAnnotation'),
  },
  // Add Text annotation
  text: {
    key: 'TextAnnotation',
    path: import('scichart/Charting/Visuals/Annotations/TextAnnotation'),
  },
  // Add a custom annotation, like a svg
  custom: {
    key: 'CustomAnnotation',
    path: import('scichart/Charting/Visuals/Annotations/CustomAnnotation'),
  },
};

function addAnnotation(key, path, chartAnnotations, opts) {
  return path.then((m) => {
    chartAnnotations.add(new m[key](opts));
  });
}

export default function(opt, sciChartSurface) {
  if (!opt || !Object.keys(opt.annotations).length) return;

  for (const annotation in opt.annotations) {
    if (annotation in annotations && !!opt.annotations[annotation]) {
      const { key, path } = annotations[annotation];
      const options = opt.annotations[annotation];

      if (Array.isArray(options)) {
        options.map((itemOptions) => {
          addAnnotation(key, path, sciChartSurface.annotations, itemOptions);
        });
      } else {
        addAnnotation(key, path, sciChartSurface.annotations, options);
      }
    }
  }
}
