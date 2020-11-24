// 导入baseService
import {
  fetch,
  devHttp,
  apiFormat2
} from '@/service/baseService';



// 获取在线设备信息
const devicesOnlineApi = devHttp + '/api/Devices/devicesOnline';
export const devicesOnline = (payload) => fetch.get(devicesOnlineApi, payload);

// 查询自动发现服务状态
const findScanApi = devHttp + '/api/Devices/findScan';
export const findScan = (payload) => fetch.get(apiFormat2(findScanApi, payload));

//查询log数量
const logSumApi = devHttp + '/api/Devices/logSum';
export const logSum = (payload) => fetch.get(logSumApi, payload);

//获取所有等待收纳的设备
const adoptDvicesAllApi = devHttp + '/api/Devices/adoptDvicesAll';
export const adoptDvicesAll = (payload) => fetch.get(adoptDvicesAllApi, payload);

//获取设备用户总数
const devicesUserSumApi = devHttp + '/api/Devices/devicesUserSum';
export const devicesUserSum = (payload) => fetch.get(devicesUserSumApi, payload);

//获取速率概况
const gatewayRateApi = devHttp + '/api/Devices/gatewayRate';
export const gatewayRate = (payload) => fetch.get(gatewayRateApi, payload);

//设备收纳
const adoptDeviceApi = devHttp + '/api/Devices/adoptDevice/ip/sn';
export const adoptDevice = (payload) => fetch.get(apiFormat2(adoptDeviceApi, payload))
