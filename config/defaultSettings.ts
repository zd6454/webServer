import { Settings as LayoutSettings } from '@ant-design/pro-layout';
 // import logo from '../public/newlogo.jpg';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#00BFBF',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu:{
    locale:false
  },
  title: '三一圣大卫',
  pwa: false,
  logo: 'https://aitmaker.cn/saveFiles/images/logo.png',
  iconfontUrl: '',
};

export default Settings;
