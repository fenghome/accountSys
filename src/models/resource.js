
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
      const data = {
        success: 'ok',
        products: [
          {
            productId: 0,
            productName: '锤子'
          }
        ]
      };
      yield put({
        type: 'queryProductsSuccess',
        payload: data.products
      });
    },

    *query({ payload }, { select, call, put }) {
      let productId = payload && payload.productId != '00000' ? payload.productId : '';
      const data = {
        success: 'ok',
        products: [
          {
            productId:0,
            productName:'被子'
          },
          {
            productId:1,
            productName:'枕头'
          }
        ]
      };
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          stocks: [...data.products],
          funds: [...data.products]
        });
      }
    }
  },

  reducers: {
    queryProductsSuccess(state, { payload: products }) {
      return { ...state, products };
    },

    querySuccess(state, { stocks, funds }) {
      return { ...state, stocks, funds };
    }
  },

};
