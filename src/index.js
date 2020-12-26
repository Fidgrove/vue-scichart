import LineChart from './LineChart';
import BandChart from './BandChart';
import BubbleChart from './BubbleChart';
import ColumnChart from './ColumnChart';
import OhlcChart from './OhlcChart';
import HeatmapChart from './HeatmapChart';
import MountainChart from './MountainChart';
import ScatterChart from './ScatterChart';
import StackedMountainChart from './StackedMountainChart';

// Declare install function executed by Vue.use()
export default function install(Vue, options) {
  Vue.prototype.$scichart = options;
  install.installed = true;
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export {
  LineChart,
  BandChart,
  BubbleChart,
  ColumnChart,
  OhlcChart,
  HeatmapChart,
  MountainChart,
  ScatterChart,
  StackedMountainChart,
};
