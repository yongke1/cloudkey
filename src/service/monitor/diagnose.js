// 导入baseService
import {
  fetch,
  devHttp,
} from '@/service/baseService';



//光口诊断
const GetPortDiagnosisApi = devHttp + '/api/Switch/GetPortDiagnosis';
export const GetPortDiagnosis = (payload) => fetch.post(GetPortDiagnosisApi, payload);