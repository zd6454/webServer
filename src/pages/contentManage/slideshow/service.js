import { request } from 'umi';
import {message} from 'antd';

export async function queryRule(data) {
  const params ={
    page:data.current,
    num:data.pageSize,
  }
  return request('http://aitmaker.cn:8000/banner/getPageBanners', {
    method: 'GET',
    params,
  }).catch((error)=> {
      message.error('轮播图获取失败')
    });
}
// export async function queryRule() {
//   return request('http://aitmaker.cn:8000/banner/getAllBanners', {
//     method: 'GET',
//   }).catch((error)=> {
//       message.error('轮播图获取失败')
//     });
// }

export async function removeRule(params) {
  return request('http://aitmaker.cn:8000/banner/deleteBanners', {
    method: 'POST',
    data: {banners:params}
  })
}

export async function useRule(id) {
  return request('http://aitmaker.cn:8000/banner/useBanner', {
    method: 'GET',
    params: {bannerId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://aitmaker.cn:8000/banner/stopBanner', {
    method: 'GET',
    params: {bannerId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://aitmaker.cn:8000/banner/addBanner', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,bannerId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('bannerId',bannerId);
  return request('http://aitmaker.cn:8000/banner/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://aitmaker.cn:8000/banner/updateBanner', {
    method: 'POST',
    data: params
  });
}

// export async function getPages(params) {
//   return request('http://aitmaker.cn:8000/banner/getPageBanners', {
//     method: 'GET',
//     data: params
//   });
// }
