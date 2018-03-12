
export default {

  namespace: 'resource',

  state: {
    breadcrumbItems: [
      ['首页', '/'],
      ['物资管理', '/resource'],
    ],
    products: [],
    stocks: [],
    funds: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname == '/resource') {
          dispatch({
            type: 'queryProducts'
          });
          dispatch({
            type: 'query'
          });
        }
      });
    },
  },

  effects: {
    *queryProducts({ payload }, { call, put, select }) {
      const isLogin = yield select(({ systemUser }) => systemUser.isLogin);
      if (!isLogin) {
        return;
      }
      const data = {
        success: 'ok',
        products: [
          {
            productId: 0,
            productName: '锤子'
          }
        ]
      };
      yield call({
        type: 'queryProductsSuccess',
        payload: data.products
      });
    },

    *query({payload},{select,call,put}){
      console.log('payload is %s',payload);
      let productId = payload && payload.productId!='00000'?payload.productId:'sss';
      console.log('productId is %s',productId);
    }
  },

  reducers: {
    queryProductsSuccess(state, { payload: products }) {
      return { ...state, products };
    },
  },

};
