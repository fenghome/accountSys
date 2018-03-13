const defaultBreadcrumb = [
  ['首页', '/'],
  ['商品管理', '/product'],
];

export default {

  namespace: 'products',

  state: {
    payeType: 'show',
    breadcrmbItems: defaultBreadcrumb,
    products: [],
    currProduct: null
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/products') {
          dispatch({ type: 'initState' });
          dispatch({ type: 'getProducts' });
        }
      })
    },
  },

  effects: {
    *getProducts({ payload }, { call, put }) {  // eslint-disable-line
      const products = [
        {
          productCode: 0,
          productImg: null,
          productName: '',
          productType: '',
          productUnit: '',
        }
      ]
      yield put({
        type: 'getProductsSuccess',
        payload: products
      });
    },
  },

  reducers: {
    initState(state, action) {
      return { ...state, pageType: 'show', breadcrmbItems: defaultBreadcrumb, currProduct: null };
    },

    getProductsSuccess(state, { payload: products }) {
      return { ...state, products }
    }
  },

};
