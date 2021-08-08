import {request} from "../../.umi/plugin-request/request";


export async function updateRule(params) {
  return request('http://1.116.77.118:2333/admin/updateAdmin', {
    method: 'POST',
    data: params
  })
}
