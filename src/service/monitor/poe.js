// 导入baseService
import {
  fetch,
  devHttp,
} from '@/service/baseService';


//光口诊断
const GetPOEListApi = devHttp + '/api/Switch/GetPOEList';
export const GetPOEList = (payload) => fetch.post(GetPOEListApi, payload);