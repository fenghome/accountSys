import { message } from 'antd';
export function requireAuth(nextState, replace) {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  if (!(userInfo && Object.keys(userInfo).length > 0)) {
    message.error('请登录');
    replace('/index');
  }
}
