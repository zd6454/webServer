import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data,forumId) {
  const params ={
    page:data.current,
    num:data.pageSize,
    forumId
  }
  return request('http://aitmaker.cn:8000/comment/getPageForumComments', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('http://aitmaker.cn:8000/comment/deleteComments', {
    method: 'POST',
    data: {comments:params}
  })
}

export async function useRule(id) {
  return request('http://aitmaker.cn:8000/comment/useComment', {
    method: 'GET',
    params: {commentId:id}
  })
}


export async function stopRule(id) {
  return request('http://aitmaker.cn:8000/comment/stopComment', {
    method: 'GET',
    params: {commentId:id}
  })
}

export async function addRule(params) {
  return request('http://aitmaker.cn:8000/comment/addComment', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('http://aitmaker.cn:8000/comment/getComment', {
    method: 'GET',
    params: {commentId:id}
  })
}

// export async function updateImg(param,commentId){
//   const imgOri = param.map((item) => {
//     return item.originFileObj;
//   });
//   const img = new FormData();
//   img.append('uploadfile', imgOri[0]);
//   img.append('commentId', commentId);
//   return request('http://aitmaker.cn:8000/forum/uploadFile', {
//     method: 'POST',
//     data: img,
//   });
// };

// export async function updateRule(params) {
//   return request('http://aitmaker.cn:8000/forum/updateForum', {
//     method: 'POST',
//     data: params
//   });
// }


