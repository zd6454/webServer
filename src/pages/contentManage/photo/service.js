import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('https://aitmaker.cn/photo/getPagePhotos', {
    method: 'GET',
    params,
  })
}
// export async function queryRule() {
//   return request('https://aitmaker.cn/banner/getAllBanners', {
//     method: 'GET',
//   }).catch((error)=> {
//       message.error('轮播图获取失败')
//     });
// }

export async function removeRule(params) {
  return request('https://aitmaker.cn/photo/deletePhotos', {
    method: 'POST',
    data: {photos:params}
  })
}

export async function useRule(id) {
  return request('https://aitmaker.cn/photo/usePhoto', {
    method: 'GET',
    params: {photoId:id}
  })
}

export async function stopRule(id,sort) {
  return request('https://aitmaker.cn/photo/stopPhoto', {
    method: 'GET',
    params: {photoId:id,sort}
  })
}

export async function addRule(params) {
  return request('https://aitmaker.cn/photo/addPhoto', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,photoId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('photoId',photoId);
  return request('https://aitmaker.cn/photo/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('https://aitmaker.cn/photo/updatePhoto', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('https://aitmaker.cn/photo/getPhoto', {
    method: 'GET',
    params: {photoId:id}
  })
}

// export async function getPages(params) {
//   return request('https://aitmaker.cn/banner/getPageBanners', {
//     method: 'GET',
//     data: params
//   });
// }
