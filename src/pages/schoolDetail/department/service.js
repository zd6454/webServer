import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://aitmaker.cn:8000/department/getPageDepartments', {
    method: 'GET',
    params,
  }).catch((error)=> {
      message.error('获取失败')
    });
}

export async function removeRule(params) {
  return request('http://aitmaker.cn:8000/department/deleteDepartments', {
    method: 'POST',
    data: {departments:params}
  })
}

export async function useRule(id) {
  return request('http://aitmaker.cn:8000/department/useDepartment', {
    method: 'GET',
    params: {departmentId:id}
  })
}

export async function useOverRule(id) {
  return request('http://aitmaker.cn:8000/department/overheadDepartment', {
    method: 'GET',
    params: {departmentId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://aitmaker.cn:8000/department/stopDepartment', {
    method: 'GET',
    params: {departmentId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://aitmaker.cn:8000/department/addDepartment', {
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
  return request('http://aitmaker.cn:8000/department/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://aitmaker.cn:8000/department/updateDepartment', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('http://aitmaker.cn:8000/department/getDepartment', {
    method: 'GET',
    params: {departmentId:id}
  })
}
