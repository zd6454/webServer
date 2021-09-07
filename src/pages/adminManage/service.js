import {request} from "../../.umi/plugin-request/request";


export async function updateRule(params) {
  return request('https://aitmaker.cn/admin/updateAdmin', {
    method: 'POST',
    data: params
  })
}
