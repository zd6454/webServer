import { request } from 'umi';

export async function addRule(params) {
  return request('http://1.116.77.118:2333/message/addMessage', {
    method: 'POST',
    data: {...params}
})
}

export async function sendUsers(params) {
  return request('http://1.116.77.118:2333/message/addMessageReceiver',{
    method:"POST",
    data:{...params}
  })

}

export async function getUsers(params) {
  return request('http://1.116.77.118:2333/user/getPageUsers', {
    method: 'GET',
    params,
  })
}
