// 导入baseService
import {
  fetch,
  devHttp,
  apiFormat2
} from '@/service/baseService';


//读取交换机所有端口概况
const GetPortsInfoApi = devHttp + '/api/SwitchPort/GetPortsInfo';
export const GetPortsInfo = (payload) => fetch.get(apiFormat2(GetPortsInfoApi, payload));