import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://aitmaker.cn:8000/user/getPageUsers', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request('http://aitmaker.cn:8000/user/deleteUsers', {
    method: 'POST',
    data: {users:params}
  })
}

export async function updateImg(param,userId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('userId', userId);
  return request('http://aitmaker.cn:8000/notice/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://aitmaker.cn:8000/user/updateUser', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  console.log('sssssssssssssssss',id)
  return request('http://aitmaker.cn:8000/user/getUser', {
    method: 'GET',
    params: {userId:id}
  })
}
