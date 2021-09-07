import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/abroad/getPageAbroads', {
    method: 'GET',
    params,
  })
}

export async function removeRule(params) {
  return request(`https://aitmaker.cn/abroad/deleteAbroad/${params.type}`, {
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
  return request(`https://aitmaker.cn/abroad/updateAbroad/${type}`, {
    method: 'POST',
    data: img,
  });
};


export async function getRule(id) {
  return request('https://aitmaker.cn/abroad/getAbroad', {
    method: 'GET',
    params: {userId:id}
  })
}

export async function getTemplate() {
  return request('https://aitmaker.cn/abroad/getApplicationTemplate', {
    method: 'GET',
  })
}

export async function updateTemplate(param){
  // const imgOri = param.map((item) => {
  //   return item.originFileObj;
  // });
  const img = new FormData();
  img.append('uploadfile', param);
  return request(`https://aitmaker.cn/abroad/uploadApplicationTemplate`, {
    method: 'POST',
    data: img,
  });
};
