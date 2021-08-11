import { request } from 'umi';

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
