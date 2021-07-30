import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://1.116.77.118:2333/interCooperation/getPageInterCoopers', {
    method: 'GET',
    params
  })
}

export async function removeRule(params) {
  return request('http://1.116.77.118:2333/interCooperation/deleteInterCoopers', {
    method: 'POST',
    data: {interCoopers:params}
  })
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
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('interCooperId',interCooperId)
  return request('http://1.116.77.118:2333/interCooperation/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://1.116.77.118:2333/interCooperation/updateInterCooper', {
    method: 'POST',
    data: params
  });
}
