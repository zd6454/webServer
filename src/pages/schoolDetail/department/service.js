import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/department/getPageDepartments', {
    method: 'GET',
    params,
  }).catch((error)=> {
      message.error('获取失败')
    });
}

export async function removeRule(params) {
  return request('https://aitmaker.cn/department/deleteDepartments', {
    method: 'POST',
    data: {departments:params}
  })
}

export async function useRule(id) {
  return request('https://aitmaker.cn/department/useDepartment', {
    method: 'GET',
    params: {departmentId:id}
  })
}

export async function useOverRule(id) {
  return request('https://aitmaker.cn/department/overheadDepartment', {
    method: 'GET',
    params: {departmentId:id}
  })
}

export async function stopRule(id,sort) {
  return request('https://aitmaker.cn/department/stopDepartment', {
    method: 'GET',
    params: {departmentId:id,sort}
  })
}

export async function addRule(params) {
  return request('https://aitmaker.cn/department/addDepartment', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,departmentId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  console.log(imgOri[0],departmentId)
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('departmentId', departmentId);
  return request('https://aitmaker.cn/department/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('https://aitmaker.cn/department/updateDepartment', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('https://aitmaker.cn/department/getDepartment', {
    method: 'GET',
    params: {departmentId:id}
  })
}
