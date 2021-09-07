import { request } from 'umi';

export interface LoginParamsType {
  adminName: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('https://aitmaker.cn/admin/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
