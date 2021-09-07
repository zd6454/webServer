import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/forum/getPageUserForums', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('https://aitmaker.cn/forum/deleteForums', {
    method: 'POST',
    data: {forums:params}
  })
}

export async function useRule(id) {
  return request('https://aitmaker.cn/forum/useForum', {
    method: 'GET',
    params: {forumId:id}
  })
}

export async function useOverRule(id) {
  return request('https://aitmaker.cn/notice/overheadNotice', {
    method: 'GET',
    params: {forumId:id}
  })
}

export async function stopRule(id,sort) {
  return request('https://aitmaker.cn/forum/stopForum', {
    method: 'GET',
    params: {forumId:id,sort}
  })
}

export async function addRule(params) {
  return request('https://aitmaker.cn/forum/addForum', {
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
  return request('https://aitmaker.cn/forum/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('https://aitmaker.cn/forum/updateForum', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('https://aitmaker.cn/forum/getForum', {
    method: 'GET',
    params: {forumId:id}
  })
}
