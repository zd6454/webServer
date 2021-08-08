import { request } from 'umi';


export async function getRule() {
  return request('http://1.116.77.118:2333/contact/getContacts', {
    method: 'GET',
  })
}

export async function updateRule(params) {
  return request('http://1.116.77.118:2333/contact/updateContact', {
    method: 'POST',
    data: params
  })
}
