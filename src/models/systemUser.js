import { doLogin, doLogup } from '../services/systemUser';

export default {
  namespace: 'systemUser',

  state: {
    isLogin: false,
    username: '',
    logupModalVisible: false,
    loginModalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *doLogup({ payload: userInfo }, { call, put }) {  // eslint-disable-line
      const data = yield call(doLogup, userInfo);
      if(data.success){

      }
      //调用service的logup函数并取得数据
      //如果成功调用logupSuccess
      yield put({ type: 'logupSuccess', payload: userInfo })
    },
    *doLogin({ payload: userInfo }, { call, put }) {
      //调用service的login函数并获取数据
      //如果成功调用loginSuccess
      yield put({ type: 'loginSuccess', payload: userInfo })
    }
  },

  reducers: {
    showLogupModal(state, action) {
      return { ...state, logupModalVisible: true };
    },
    hideLogupModal(state, action) {
      return { ...state, logupModalVisible: false }
    },
    showLoginModal(state, action) {
      return { ...state, loginModalVisible: true };
    },
    hideLoginModal(state, action) {
      return { ...state, loginModalVisible: false }
    },
    logupSuccess(state, { payload: userInfo }) {
      const { username } = userInfo;
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify(username));
      return { ...state, username, isLogin: true }
    },
    loginSuccess(state, { payload: userInfo }) {
      const { username } = userInfo;
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify(username));
      return { ...state, username, isLogin: true }
    },
    logout(state, action) {
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify({}));
      return { ...state, isLogin: false, username: '' }
    },

  },
}
