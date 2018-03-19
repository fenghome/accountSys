import { doLogin, doLogup } from '../services/systemUser';

export default {
  namespace: 'systemUser',

  state: {
    isLogin: false,
    username: '',
    authToken:'',
    logupModalVisible: false,
    loginModalVisible: false,
    logupErrMsg: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({pathname})=>{
        if(pathname === '/index'){
          const sessionStorage = window.sessionStorage;
          if(sessionStorage.getItem('userInfo')){
            dispatch({
              type:'loginSuccess',
              payload:JSON.parse(sessionStorage.getItem('userInfo'))
            })
          }

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
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      return { ...state, ...userInfo, isLogin: true, logupModalVisible:false }
    },
    logupErr(state, { payload: logupErrMsg }) {
      return { ...state, logupErrMsg }
    },
    loginSuccess(state, { payload: userInfo }) {
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      return { ...state, ...userInfo, isLogin: true }
    },
    logout(state, action) {
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('userInfo', JSON.stringify({}));
      return { ...state, isLogin: false, username: '' }
    },

  },
}
