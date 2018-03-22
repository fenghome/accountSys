import { doLogin, doLogup, doLogout } from '../services/systemUser';

const defaultState = {
  isLogin: false,
  username: '',
  authToken: '',
  logupModalVisible: false,
  loginModalVisible: false,
  logupErrMsg: '',
  loginErrMsg: '',
}

export default {
  namespace: 'systemUser',

  state: defaultState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        const sessionStorage = window.sessionStorage;
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfo && Object.keys(userInfo).length > 0) {
          dispatch({
            type: 'loginSuccess',
            payload: JSON.parse(sessionStorage.getItem('userInfo'))
          })
        }
      })
    },
  },

  effects: {
    *doLogup({ payload: userInfo }, { call, put }) {  // eslint-disable-line
      const res = yield call(doLogup, userInfo);
      if (!res.data.success) {
        if (res.data.code == '3') {
          yield put({ type: 'logupErr', payload: '用户已存在' });
        } else {
          yield put({ type: 'logupErr', payload: '用户注册失败' });
        }
      } else {
        yield put({ type: 'logupSuccess', payload: res.data.userInfo });
      }
    },

    *doLogin({ payload: userInfo }, { call, put }) {
      const res = yield call(doLogin, userInfo);
      if (!res.data.success) {
        if (res.data.code == '1') {
          yield put({ type: 'loginErr', payload: '用户不存在' });
        } else if (res.data.code == '2') {
          yield put({ type: 'loginErr', payload: '密码错误' });
        } else {
          yield put({ type: 'loginErr', payload: '登录失败' });
        }
      } else {
        yield put({ type: 'loginSuccess', payload: res.data.userInfo })
      }
    },

    *doLogout({payload},{call,put}){
      const res = yield call(doLogout);
      console.log(res);
      if(res.data.success){
        yield put({type:'logout'});
      }
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
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      return { ...state, ...userInfo, isLogin: true, logupModalVisible: false }
    },

    loginSuccess(state, { payload: userInfo }) {
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      return { ...state, ...userInfo, isLogin: true, loginModalVisible: false }
    },

    logupErr(state, { payload: logupErrMsg }) {
      return { ...state, logupErrMsg }
    },

    loginErr(state, { payload: loginErrMsg }) {
      return { ...state, loginErrMsg }
    },

    logout(state, action) {
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify({}));
      return { ...defaultState, isLogin: false, username: '' }
    },
  },
}
