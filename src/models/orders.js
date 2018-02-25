
export default {

    namespace: 'orders',
  
    state: {
        pageType:'show', //show,edit,add
        breadcrumbItems:[
            ['首页','/index'],
            ['订单','/orders']
        ]
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetch({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ type: 'save' });
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  