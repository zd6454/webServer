import { request } from 'umi';


export async function getRule() {
  return request('http://aitmaker.cn:8000/contact/getContacts', {
    method: 'GET',
  })
}

export async function updateRule(params) {
  return request('http://aitmaker.cn:8000/contact/updateContact', {
    method: 'POST',
    data: params
  })
}
