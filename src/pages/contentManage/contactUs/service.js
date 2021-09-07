import { request } from 'umi';


export async function getRule() {
  return request('https://aitmaker.cn/contact/getContacts', {
    method: 'GET',
  })
}

export async function updateRule(params) {
  return request('https://aitmaker.cn/contact/updateContact', {
    method: 'POST',
    data: params
  })
}
