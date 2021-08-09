import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://1.116.77.118:2333/abroad/getPageAbroads', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request(`http://1.116.77.118:2333/abroad/deleteAbroad/${params.type}`, {
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
  return request(`http://1.116.77.118:2333/abroad/updateAbroad/${type}`, {
    method: 'POST',
    data: img,
  });
};


export async function getRule(id) {
  return request('http://1.116.77.118:2333/abroad/getAbroad', {
    method: 'GET',
    params: {userId:id}
  })
}
