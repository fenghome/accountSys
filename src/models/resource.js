import request from '../utils/request';
import qs from 'qs';
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
            type: 'getProducts'
          });
        }
      });
    },
  },

  effects: {
    *getProducts({ payload }, { call, put, select }) {
      const res = yield call(request, `/api/products/all`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'queryProductsSuccess',
          payload: res.data.products
        });
      }
    },

    *query({ payload }, { select, call, put }) {
      let productId = payload && payload.productId != '00000' ? payload.productId : '';
      const params = qs.stringify({productId})
      const res = yield call(request,`/api/resource?${params}`,{
        method:'GET'
      });
      // if (data && data.success) {
      //   yield put({
      //     type: 'querySuccess',
      //     stocks: [...data.products],
      //     funds: [...data.products]
      //   });
      // }
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
