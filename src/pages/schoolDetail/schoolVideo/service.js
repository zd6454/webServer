import request from 'umi-request';
import {message} from 'antd';


export async function getRule() {
  return request('http://1.116.77.118:2333/schoolVideo/getSchoolVideo', {
    method: 'GET',
  })
}

export async function updateRule(params) {
  const video = new FormData();
  video.append('uploadvideo', params);
  return request('http://1.116.77.118:2333/schoolVideo/uploadSchoolVideo', {
    method: 'POST',
    data: video,
  })
}
export async function deleteRule() {
  return request('http://1.116.77.118:2333/schoolVideo/deleteSchoolVideo', {
    method: 'GET',
  })
}

