import { request } from 'umi';
import {message} from 'antd';

export async function queryRule() {
  return request('http://1.116.77.118:2333/banner/getAllBanners', {
    method: 'GET',
  }).catch((error)=> {
      message.error('轮播图获取失败')
    });
}

export async function removeRule(params) {
  return request('http://1.116.77.118:2333/banner/deleteBanners', {
    method: 'POST',
    data: {banners:params}
  }).catch((error)=> {
    message.error('删除失败')
  });
}

export async function useRule(id) {
  return request('http://1.116.77.118:2333/banner/useBanner', {
    method: 'GET',
    params: {bannerId:id}
  })
}

export async function stopRule(id,sort) {
  return request('http://1.116.77.118:2333/banner/stopBanner', {
    method: 'GET',
    params: {bannerId:id,sort}
  })
}

export async function addRule(params) {
  return request('http://1.116.77.118:2333/banner/addBanner', {
    method: 'POST',
    data: params
  });
}

export async function updateImg(param,bannerId){
  const imgOri = param.map((item) => {
    return item.originFileObj;
  });
  console.log(imgOri[0],bannerId)
  const img = new FormData();
  img.append('uploadfile', imgOri[0]);
  img.append('bannerId',bannerId);
  return request('http://1.116.77.118:2333/banner/uploadFile', {
    method: 'POST',
    data: img,
  });
};

export async function updateRule(params) {
  return request('http://1.116.77.118:2333/banner/updateBanner', {
    method: 'POST',
    data: params
  });
}
