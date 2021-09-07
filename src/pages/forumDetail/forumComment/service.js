import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data,forumId) {
  const params ={
    page:data.current,
    num:data.pageSize,
    forumId
  }
  return request('https://aitmaker.cn/comment/getPageForumComments', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('https://aitmaker.cn/comment/deleteComments', {
    method: 'POST',
    data: {comments:params}
  })
}

export async function useRule(id) {
  return request('https://aitmaker.cn/comment/useComment', {
    method: 'GET',
    params: {commentId:id}
  })
}


export async function stopRule(id) {
  return request('https://aitmaker.cn/comment/stopComment', {
    method: 'GET',
    params: {commentId:id}
  })
}

export async function addRule(params) {
  return request('https://aitmaker.cn/comment/addComment', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('https://aitmaker.cn/comment/getComment', {
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
//   return request('https://aitmaker.cn/forum/uploadFile', {
//     method: 'POST',
//     data: img,
//   });
// };

// export async function updateRule(params) {
//   return request('https://aitmaker.cn/forum/updateForum', {
//     method: 'POST',
//     data: params
//   });
// }


