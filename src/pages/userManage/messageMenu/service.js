import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://aitmaker.cn:8000/message/getPageMessages', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('http://aitmaker.cn:8000/message/deleteMessages', {
    method: 'POST',
    data: {messages:params}
  })
}


export async function addRule(params) {
  return request('http://aitmaker.cn:8000/message/addMessage', {
    method: 'POST',
    data: params
  });
}
export async function addReceiver(params) {
  return request('http://aitmaker.cn:8000/message/addMessageReceiver', {
    method: 'POST',
    data: params
  });
}


// export async function updateRule(params) {
//   return request('http://aitmaker.cn:8000/interCooperation/updateInterCooper', {
//     method: 'POST',
//     data: params
//   });
// }

// export async function getRule(id) {
//   return request('http://aitmaker.cn:8000/interCooperation/getInterCooper', {
//     method: 'GET',
//     params: {messageId:id}
//   })
// }

export async function getMessageDetail(params) {
  return request('http://aitmaker.cn:8000/message/getMessage', {
    method: 'GET',
    params: {messageId:params}
  })
}
