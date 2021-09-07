import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/message/getPageMessages', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('https://aitmaker.cn/message/deleteMessages', {
    method: 'POST',
    data: {messages:params}
  })
}


export async function addRule(params) {
  return request('https://aitmaker.cn/message/addMessage', {
    method: 'POST',
    data: params
  });
}
export async function addReceiver(params) {
  return request('https://aitmaker.cn/message/addMessageReceiver', {
    method: 'POST',
    data: params
  });
}


// export async function updateRule(params) {
//   return request('https://aitmaker.cn/interCooperation/updateInterCooper', {
//     method: 'POST',
//     data: params
//   });
// }

// export async function getRule(id) {
//   return request('https://aitmaker.cn/interCooperation/getInterCooper', {
//     method: 'GET',
//     params: {messageId:id}
//   })
// }

export async function getMessageDetail(params) {
  return request('https://aitmaker.cn/message/getMessage', {
    method: 'GET',
    params: {messageId:params}
  })
}
