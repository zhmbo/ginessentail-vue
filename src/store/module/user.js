import storageService from '@/service/storageService';
import userService from '@/service/userService';

const userModule = {
  namespaced: true,
  state: {
    token: storageService.get(storageService.USER_TOKEN),
    userInfo: JSON.parse(storageService.get(storageService.USER_INFO)),
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 更新本地缓存
      storageService.set(storageService.USER_TOKEN, token);
      // 跟新state
      state.token = token;
    },
    SET_USERINFO(state, userInfo) {
      // 更新本地缓存
      storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
      // 跟新state
      state.userInfo = userInfo;
    },
  },
  actions: {
    register(context, { name, telephone, password }) {
      return new Promise((reslove, reject) => {
        userService.register({ name, telephone, password }).then((res) => {
          // 保存 token
          context.commit('SET_TOKEN', res.data.data.token);
          // promise 链式调用
          return userService.info();
        }).then((res) => {
          // 保存用户信息
          context.commit('SET_USERINFO', res.data.data.user);
          reslove(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};

export default userModule;