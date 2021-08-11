import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://aitmaker.cn:8000/interCooperation/getPageInterCoopers', {
    method: 'GET',
    params
  })
}

export async function removeRule(params) {
  return request('http://aitmaker.cn:8000/interCooperation/deleteInterCoopers', {
    method: 'POST',
    data: {interCoopers:params}
  })
}

export async function useRule(id) {
  return request('http://aitmaker.cn:8000/interCooperation/useInterCooper', {
    method: 'GET',
    params: {interCooperId:id}
  })
}

export async function useOverRule(id) {
  return request('http://aitmaker.cn:8000/interCooperation/overheadInterCooper', {
    method: 'GET',
    params: {interCooperId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://aitmaker.cn:8000/interCooperation/stopInterCooper', {
    method: 'GET',
    params: {interCooperId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://aitmaker.cn:8000/interCooperation/addInterCooper', {
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
  return request('http://aitmaker.cn:8000/interCooperation/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://aitmaker.cn:8000/interCooperation/updateInterCooper', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('http://aitmaker.cn:8000/interCooperation/getInterCooper', {
    method: 'GET',
    params: {interCooperId:id}
  })
}
