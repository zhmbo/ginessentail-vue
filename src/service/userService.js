import request from '@/utils/request';

// 注册
const register = ({ name, telephone, password }) => {
  return request.post('auth/register', { name, telephone, password });
};

// 请求用户信息
const info = () => {
  return request.get('auth/info');
};

export default {
  register,
  info,
};
