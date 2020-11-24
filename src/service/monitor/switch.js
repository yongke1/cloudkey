// 导入baseService
import {
  fetch,
  devHttp,
  apiFormat2
} from '@/service/baseService';


// 获取switch列表信息
const devicesApi = devHttp + '/api/Devices/devices';
export const devices = (payload) => fetch.get(devicesApi, payload);

// 获取交换机窗口信息
const GetSwitchInterfaceApi = devHttp + '/api/switch/GetSwitchInterface';
export const GetSwitchInterface = (payload) => fetch.post(GetSwitchInterfaceApi, payload);

//获取switch cpu图表,连接状态信息
const CpuWithRamApi = devHttp + '/api/switch/CpuWithRam';
export const CpuWithRam = (payload) => fetch.post(CpuWithRamApi, payload);

//获取switch Neibor 表格列表信息
const GetSwitchNeighboursApi = devHttp + '/api/Switch/GetSwitchNeighbours';
export const GetSwitchNeighbours = (payload) => fetch.post(GetSwitchNeighboursApi, payload);
//获取交换机近1小时走势图表
const GetSwitchChartsApi = devHttp + '/api/Switch/GetSwitchCharts';
export const GetSwitchCharts = (payload) => fetch.post(GetSwitchChartsApi, payload);

//获取交换机的日志
const GetFSDeviceLogApi = devHttp + '/api/Switch/GetFSDeviceLog';
export const GetFSDeviceLog = (payload) => fetch.get(apiFormat2(GetFSDeviceLogApi, payload));

//删除交换机
const DeleteDeviceApi = devHttp + '/api/Devices/DeleteDevice';
export const DeleteDevice = (payload) => fetch.post(DeleteDeviceApi, payload);

