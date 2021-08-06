import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://1.116.77.118:2333/message/getPageMessages', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('http://1.116.77.118:2333/message/deleteMessages', {
    method: 'POST',
    data: {messages:params}
  })
}


export async function addRule(params) {
  return request('http://1.116.77.118:2333/message/addMessage', {
    method: 'POST',
    data: params
  });
}
export async function addReceiver(params) {
  return request('http://1.116.77.118:2333/message/addMessageReceiver', {
    method: 'POST',
    data: params
  });
}


// export async function updateRule(params) {
//   return request('http://1.116.77.118:2333/interCooperation/updateInterCooper', {
//     method: 'POST',
//     data: params
//   });
// }

// export async function getRule(id) {
//   return request('http://1.116.77.118:2333/interCooperation/getInterCooper', {
//     method: 'GET',
//     params: {messageId:id}
//   })
// }

export async function getUser() {
  return request('http://1.116.77.118:2333/user/getPageUsers', {
    method: 'GET',
    params: {page:1,num:100}
  })
}
