import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/schoolmate/getPageSchoolmates', {
    method: 'GET',
    params
  })
}
export async function removeRule(params) {
  return request('https://aitmaker.cn/schoolmate/deleteSchoolmates', {
    method: 'POST',
    data: {schoolmates:params}
  })
}

export async function useRule(id) {
  return request('https://aitmaker.cn/schoolmate/useSchoolmate', {
    method: 'GET',
    params: {schoolmateId:id}
  })
}

export async function stopRule(id,sort) {
  return request('https://aitmaker.cn/schoolmate/stopSchoolmate', {
    method: 'GET',
    params: {schoolmateId:id,sort}
  })
}

export async function addRule(params) {
  return request('https://aitmaker.cn/schoolmate/addSchoolmate', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,schoolmateId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  console.log(imgOri[0],schoolmateId)
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('schoolmateId', schoolmateId);
  return request('https://aitmaker.cn/schoolmate/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('https://aitmaker.cn/schoolmate/updateSchoolmate', {
    method: 'POST',
    data: params
  });
}
export async function getRule(id) {
  return request('https://aitmaker.cn/schoolmate/getSchoolmate\n' +
    '\n', {
    method: 'GET',
    params: {schoolmateId:id}
  })
}
