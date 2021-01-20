module.exports = {
  themeConfig: {
    title: 'vue-scichart',
    description: 'Vue plugin for using Scichart',
    logo: '/img/vue-scichart_logo.svg',
    searchPlaceholder: 'Search...',
    repo: 'Fidgrove/vue-scichart',
    docsDir: 'docs/content/docs',
    editLinks: true,
    repoLabel: 'Contribute',
    lastUpdated: 'Last Updated',
    editLinkText: 'Help us improve this page!',
    smoothScroll: true,
    sidebar: [
      {
        title: 'Introduction',
        path: '/content/docs/',
        collapsable: false,
        children: ['/content/docs/configs', '/content/docs/options'],
      },
      {
        title: 'Chart Examples',
        children: [
          '/content/docs/examples/BandChart',
          '/content/docs/examples/BubbleChart',
          '/content/docs/examples/ColumnChart',
          '/content/docs/examples/HeatmapChart',
          '/content/docs/examples/LineChart',
          '/content/docs/examples/MountainChart',
          '/content/docs/examples/OhlcChart',
          '/content/docs/examples/ScatterChart',
          '/content/docs/examples/StackedMountainChart',
        ],
      },
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/content/docs/' },
    ],
  },
};
