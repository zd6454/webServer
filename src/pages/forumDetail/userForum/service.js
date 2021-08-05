import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://1.116.77.118:2333/forum/getPageUserForums', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('http://1.116.77.118:2333/forum/deleteForums', {
    method: 'POST',
    data: {forums:params}
  })
}

export async function useRule(id) {
  return request('http://1.116.77.118:2333/forum/useForum', {
    method: 'GET',
    params: {forumId:id}
  })
}

export async function useOverRule(id) {
  return request('http://1.116.77.118:2333/notice/overheadNotice', {
    method: 'GET',
    params: {forumId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://1.116.77.118:2333/forum/stopForum', {
    method: 'GET',
    params: {forumId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://1.116.77.118:2333/forum/addForum', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,forumId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('forumId', forumId);
  return request('http://1.116.77.118:2333/forum/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://1.116.77.118:2333/forum/updateForum', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('http://1.116.77.118:2333/forum/getForum', {
    method: 'GET',
    params: {forumId:id}
  })
}
