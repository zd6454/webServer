import { request } from 'umi';

export async function addRule(params) {
  return request('https://aitmaker.cn/message/addMessage', {
    method: 'POST',
    data: {...params}
})
}

export async function sendUsers(params) {
  return request('https://aitmaker.cn/message/addMessageReceiver',{
    method:"POST",
    data:{...params}
  })

}

export async function getUsers(params) {
  return request('https://aitmaker.cn/user/getPageUsers', {
    method: 'GET',
    params,
  })
}
