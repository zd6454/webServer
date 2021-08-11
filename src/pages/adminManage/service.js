import {request} from "../../.umi/plugin-request/request";


export async function updateRule(params) {
  return request('http://aitmaker.cn:8000/admin/updateAdmin', {
    method: 'POST',
    data: params
  })
}
