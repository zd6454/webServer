import { request } from 'umi';

export async function addRule(params) {
  return request('http://aitmaker.cn:8000/message/addMessage', {
    method: 'POST',
    data: {...params}
})
}

export async function sendUsers(params) {
  return request('http://aitmaker.cn:8000/message/addMessageReceiver',{
    method:"POST",
    data:{...params}
  })

}

export async function getUsers(params) {
  return request('http://aitmaker.cn:8000/user/getPageUsers', {
    method: 'GET',
    params,
  })
}
