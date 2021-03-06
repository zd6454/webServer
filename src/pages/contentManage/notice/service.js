import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/notice/getPageNotices', {
    method: 'GET',
    params,
  }).catch((error)=> {
      message.error('置顶通知获取失败')
    });
}

export async function removeRule(params) {
  return request('https://aitmaker.cn/notice/deleteNotices', {
    method: 'POST',
    data: {notices:params}
  })
}

export async function useRule(id) {
  return request('https://aitmaker.cn/notice/useNotice', {
    method: 'GET',
    params: {noticeId:id}
  })
}

export async function useOverRule(id) {
  return request('https://aitmaker.cn/notice/overheadNotice', {
    method: 'GET',
    params: {noticeId:id}
  })
}

export async function stopRule(id,sort) {
  return request('https://aitmaker.cn/notice/stopNotice', {
    method: 'GET',
    params: {noticeId:id,sort}
  })
}

export async function addRule(params) {
  return request('https://aitmaker.cn/notice/addNotice', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,noticeId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('noticeId', noticeId);
  return request('https://aitmaker.cn/notice/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('https://aitmaker.cn/notice/updateNotice', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('https://aitmaker.cn/notice/getNotice', {
    method: 'GET',
    params: {noticeId:id}
  })
}
