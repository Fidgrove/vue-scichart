import Vue from 'vue'
import scichart from 'vue-scichart'

Vue.use(scichart, <%= serialize(options) %>)