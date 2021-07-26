import { request } from 'umi';
import {message} from 'antd';

export async function queryRule() {
  return request('http://1.116.77.118:2333/interCooperation/getAllInterCoopers', {
    method: 'GET',
  }).catch((error)=> {
      message.error('获取失败')
    });
}

export async function removeRule(params) {
  return request('http://1.116.77.118:2333/interCooperation/deleteInterCoopers', {
    method: 'POST',
    data: {interCoopers:params}
  }).catch((error)=> {
    message.error('删除失败')
  });
}

export async function useRule(id) {
  return request('http://1.116.77.118:2333/interCooperation/useInterCooper', {
    method: 'GET',
    params: {interCooperId:id}
  })
}

export async function useOverRule(id) {
  return request('http://1.116.77.118:2333/interCooperation/overheadInterCooper', {
    method: 'GET',
    params: {interCooperId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://1.116.77.118:2333/interCooperation/stopInterCooper', {
    method: 'GET',
    params: {interCooperId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://1.116.77.118:2333/interCooperation/addInterCooper', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,interCooperId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  console.log(imgOri[0],interCooperId)
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('interCooperId',interCooperId)
  return request('http://1.116.77.118:2333/interCooperation/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://1.116.77.118:2333/information/uploadFile/InterCooperation', {
    method: 'POST',
    data: params
  });
}
