/**挂载vue原型上的全局方法 */
/**
 *  描述：基于vue的扩展
 */
import _hyTool from "@assets/js/tool/tool"; //公共方法
import pageServices from "@components/pageServices/pageServices"
import cloudButton from "@components/button/button"
import cloudGrogress from "@components/progress/progress"
import cloudMessageBox from "@components/messagebox/index"
import dashBoard from "@components/dashboard/index"
import showSearch from "@components/showSearch/showSearch"
import network from "@components/network/network"
import cloudNotification from "@components/Notification/index"
import cloudTabgroup from "@components/tabgroup/tabgroup"
import clouddropdown from "@components/dropdown/dropdown"
import radarLoading from "@components/loading/radarLoading/radar"
import lineChart from "@components/chart/dashBoard/lineChart"
import treeChart from "@components/chart/network/treeChart"
import treeg6 from "@components/chart/network/treeg6"
import treeg6test from "@components/chart/network/treeg6test"
import { findScan } from "@service/dashboard/dashboard"
// 全局方法
const install = function (Vue) {
  Vue.prototype._hyTool = Vue._hyTool = Vue.prototype._hyTool || _hyTool;
  Vue.component(pageServices.name, pageServices)
  Vue.component(cloudButton.name, cloudButton)
  Vue.component(cloudGrogress.name, cloudGrogress)
  Vue.component(cloudMessageBox.name, cloudMessageBox)
  Vue.component(dashBoard.name, dashBoard)
  Vue.component(showSearch.name, showSearch)
  Vue.component(network.name, network)
  Vue.component(cloudNotification.name, cloudNotification)
  Vue.component(cloudTabgroup.name, cloudTabgroup)
  Vue.component(clouddropdown.name, clouddropdown)
  Vue.component(radarLoading.name, radarLoading)
  Vue.component(lineChart.name, lineChart)
  Vue.component(treeChart.name, treeChart)
  Vue.component(treeg6.name, treeg6)
  Vue.component(treeg6test.name, treeg6test)
  Vue.prototype.$findScan = (status) => { //自动搜索全局函数  0，开启服务，1，获取服务状态，2，关闭服务
    return findScan({ scanState: status });
  };
}
const core = {
  install
}

export default core