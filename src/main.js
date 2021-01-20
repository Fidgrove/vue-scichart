import Vue from 'vue';
import App from './App.vue';
import scichart from './index';

Vue.config.productionTip = false;

Vue.use(scichart, {
  key: process.env.VUE_APP_SCICHART_KEY,
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
