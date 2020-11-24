// 导入baseService
import {
  fetch,
  devHttp,
} from '@/service/baseService';




//获取交换机的VLan配置列表
const GetVLanListApi = devHttp + '/api/Switch/GetVLanList';
export const GetVLanList = (payload) => fetch.post(GetVLanListApi, payload);


//获取vlan添加接口
const AddVLanApi = devHttp + '/api/Switch/AddVLan';
export const AddVLan = (payload) => fetch.post(AddVLanApi, payload);


//获取vlan删除接口
const DeleteVLanApi = devHttp + '/api/Switch/DeleteVLan';
export const DeleteVLan = (payload) => fetch.post(DeleteVLanApi, payload);

//获取svi列表
const GetSVIListApi = devHttp + '/api/Switch/GetSVIList';
export const GetSVIList = (payload) => fetch.post(GetSVIListApi, payload);


//获取svi添加接口
const AddSviApi = devHttp + '/api/Switch/AddSvi';
export const AddSvi = (payload) => fetch.post(AddSviApi, payload);


//获取DHCP添加接口
const AddDHCPApi = devHttp + '/api/Switch/AddDHCP';
export const AddDHCP = (payload) => fetch.post(AddDHCPApi, payload);