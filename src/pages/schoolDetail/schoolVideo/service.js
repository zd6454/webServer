import request from 'umi-request';
import {message} from 'antd';


export async function getRule() {
  return request('https://aitmaker.cn/schoolVideo/getSchoolVideo', {
    method: 'GET',
  })
}

export async function updateRule(params) {
  const video = new FormData();
  video.append('uploadvideo', params);
  return request('https://aitmaker.cn/schoolVideo/uploadSchoolVideo', {
    method: 'POST',
    data: video,
  })
}
export async function deleteRule() {
  return request('https://aitmaker.cn/schoolVideo/deleteSchoolVideo', {
    method: 'GET',
  })
}

