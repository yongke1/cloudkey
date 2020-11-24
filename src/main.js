import Vue from '@assets/js/element/element'
import App from './App.vue'
import router from './route/index.js'
import 'element-ui/lib/theme-chalk/index.css';
import tool from "@assets/js/tool/tool.js"
import message from '@/assets/js/tool/message.js'
import core from "@assets/js/tool/global"
import 'xterm/css/xterm.css'
let echarts = require('echarts/lib/echarts');
require("echarts/lib/chart/bar");//柱状图
require('echarts/lib/chart/line');//线型图
require('echarts/lib/chart/pie');//饼图
require('echarts/lib/chart/radar');//雷达图
require('echarts/lib/chart/tree');//树状图
require("echarts/lib/component/title");//图表标题
require('echarts/lib/component/dataZoom')//dataZoom组件
require("echarts/lib/component/tooltip");//tooltip
require("echarts/lib/component/legend");//图例
//vue全局注入echarts
Vue.prototype.$echarts = echarts

Vue.prototype.tool = tool;
Vue.prototype.$messageOK = message
Vue.use(core)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')