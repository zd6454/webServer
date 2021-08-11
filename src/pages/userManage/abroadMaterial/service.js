import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://aitmaker.cn:8000/abroad/getPageAbroads', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request(`http://aitmaker.cn:8000/abroad/deleteAbroad/${params.type}`, {
    method: 'GET',
    data: {userId:params.userId}
  })
}

export async function updateRule(param,userId,type){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('userId', userId);
  return request(`http://aitmaker.cn:8000/abroad/updateAbroad/${type}`, {
    method: 'POST',
    data: img,
  });
};


export async function getRule(id) {
  return request('http://aitmaker.cn:8000/abroad/getAbroad', {
    method: 'GET',
    params: {userId:id}
  })
}
