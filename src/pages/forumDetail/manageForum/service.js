import { request } from 'umi';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://aitmaker.cn:8000/forum/getPageForums', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('http://aitmaker.cn:8000/forum/deleteForums', {
    method: 'POST',
    data: {forums:params}
  })
}

export async function useRule(id) {
  return request('http://aitmaker.cn:8000/forum/useForum', {
    method: 'GET',
    params: {forumId:id}
  })
}

export async function useOverRule(id) {
  return request('http://aitmaker.cn:8000/notice/overheadNotice', {
    method: 'GET',
    params: {forumId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://aitmaker.cn:8000/forum/stopForum', {
    method: 'GET',
    params: {forumId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://aitmaker.cn:8000/forum/addForum', {
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
  return request('http://aitmaker.cn:8000/forum/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://aitmaker.cn:8000/forum/updateForum', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('http://aitmaker.cn:8000/forum/getForum', {
    method: 'GET',
    params: {forumId:id}
  })
}
