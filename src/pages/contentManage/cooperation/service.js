import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/interCooperation/getPageInterCoopers', {
    method: 'GET',
    params
  })
}

export async function removeRule(params) {
  return request('https://aitmaker.cn/interCooperation/deleteInterCoopers', {
    method: 'POST',
    data: {interCoopers:params}
  })
}

export async function useRule(id) {
  return request('https://aitmaker.cn/interCooperation/useInterCooper', {
    method: 'GET',
    params: {interCooperId:id}
  })
}

export async function useOverRule(id) {
  return request('https://aitmaker.cn/interCooperation/overheadInterCooper', {
    method: 'GET',
    params: {interCooperId:id}
  })
}

export async function stopRule(id,sort) {
  return request('https://aitmaker.cn/interCooperation/stopInterCooper', {
    method: 'GET',
    params: {interCooperId:id,sort}
  })
}

export async function addRule(params) {
  return request('https://aitmaker.cn/interCooperation/addInterCooper', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,interCooperId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('interCooperId',interCooperId)
  return request('https://aitmaker.cn/interCooperation/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('https://aitmaker.cn/interCooperation/updateInterCooper', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('https://aitmaker.cn/interCooperation/getInterCooper', {
    method: 'GET',
    params: {interCooperId:id}
  })
}
