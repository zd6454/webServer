import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://1.116.77.118:2333/photo/getPagePhotos', {
    method: 'GET',
    params,
  })
}
// export async function queryRule() {
//   return request('http://1.116.77.118:2333/banner/getAllBanners', {
//     method: 'GET',
//   }).catch((error)=> {
//       message.error('轮播图获取失败')
//     });
// }

export async function removeRule(params) {
  return request('http://1.116.77.118:2333/photo/deletePhotos', {
    method: 'POST',
    data: {photos:params}
  })
}

export async function useRule(id) {
  return request('http://1.116.77.118:2333/photo/usePhoto', {
    method: 'GET',
    params: {photoId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://1.116.77.118:2333/photo/stopPhoto', {
    method: 'GET',
    params: {photoId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://1.116.77.118:2333/photo/addPhoto', {
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
  return request('http://1.116.77.118:2333/photo/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://1.116.77.118:2333/photo/updatePhoto', {
    method: 'POST',
    data: params
  });
}

export async function getRule(id) {
  return request('http://1.116.77.118:2333/photo/getPhoto', {
    method: 'GET',
    params: {photoId:id}
  })
}

// export async function getPages(params) {
//   return request('http://1.116.77.118:2333/banner/getPageBanners', {
//     method: 'GET',
//     data: params
//   });
// }
