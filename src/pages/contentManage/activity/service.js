import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/activity/getPageActivitys', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('https://aitmaker.cn/activity/deleteActivitys', {
    method: 'POST',
    data: {activitys:params}
  })
}

export async function useRule(id) {
  return request('https://aitmaker.cn/activity/useActivity', {
    method: 'GET',
    params: {activityId:id}
  })
}


export async function stopRule(id,sort) {
  return request('https://aitmaker.cn/activity/stopActivity', {
    method: 'GET',
    params: {activityId:id,sort}
  })
}

export async function addRule(params) {
  return request('https://aitmaker.cn/activity/addActivity', {
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
  return request('https://aitmaker.cn/activity/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('https://aitmaker.cn/activity/updateActivity', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('https://aitmaker.cn/activity/getActivity', {
    method: 'GET',
    params: {activityId:id}
  })
}
