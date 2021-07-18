import { request } from 'umi';
import {message} from 'antd';

export async function queryRule() {
  return request('http://duing.site:2333/notice/getAllNotices', {
    method: 'GET',
  }).catch((error)=> {
      message.error('置顶通知获取失败')
    });
}

export async function removeRule(params) {
  return request('http://duing.site:2333/notice/deleteNotices', {
    method: 'POST',
    data: {notices:params}
  }).catch((error)=> {
    message.error('删除失败')
  });
}

export async function useRule(id) {
  return request('http://duing.site:2333/notice/useNotice', {
    method: 'GET',
    params: {noticeId:id}
  })
}

export async function useOverRule(id) {
  return request('http://duing.site:2333/notice/overheadNotice', {
    method: 'GET',
    params: {noticeId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://duing.site:2333/notice/stopNotice', {
    method: 'GET',
    params: {noticeId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://duing.site:2333/notice/addNotice', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,noticeId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  console.log(imgOri[0],noticeId)
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('noticeId', noticeId);
  return request('http://duing.site:2333/notice/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://duing.site:2333/notice/updateNotice', {
    method: 'POST',
    data: params
  });
}
