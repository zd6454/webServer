import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://1.116.77.118:2333/activity/getPageActivitys', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('http://1.116.77.118:2333/activity/deleteActivitys', {
    method: 'POST',
    data: {activitys:params}
  })
}

export async function useRule(id) {
  return request('http://1.116.77.118:2333/activity/useActivity', {
    method: 'GET',
    params: {activityId:id}
  })
}


export async function stopRule(id,sort) {
  return request('http://1.116.77.118:2333/activity/stopActivity', {
    method: 'GET',
    params: {activityId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://1.116.77.118:2333/activity/addActivity', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,activityId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('activityId', activityId);
  return request('http://1.116.77.118:2333/activity/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://1.116.77.118:2333/activity/updateActivity', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('http://1.116.77.118:2333/activity/getActivity', {
    method: 'GET',
    params: {activityId:id}
  })
}
