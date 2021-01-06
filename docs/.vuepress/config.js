module.exports = {
  themeConfig: {
    title: 'vue-scichart',
    description: 'Vue plugin for using Scichart',
    logo: '/img/vue-scichart_logo.svg',
    searchPlaceholder: 'Search...',
    repo: 'Fidgrove/vue-scichart',
    docsDir: 'docs/src',
    editLinks: true,
    repoLabel: 'Contribute',
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    sidebar: [
      {
        title: 'Introduction',
        path: '/content/docs/',
        collapsable: false,
        children: ['/content/docs/configs'],
      },
    ],
    sidebarDepth: 3,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/content/docs/' },
    ],
  },
};
