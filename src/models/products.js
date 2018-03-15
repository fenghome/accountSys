const defaultBreadcrumb = [
  [
    '首页', '/'
  ],
  ['商品管理', '/product']
];

export default {

  namespace: 'products',

  state: {
    pageType: 'show',
    breadcrmbItems: defaultBreadcrumb,
    products: [],
    currProduct: null
  },

  subscriptions: {
    setup({ dispatch, history }) { // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/product') {
          dispatch({ type: 'initState' });
          dispatch({ type: 'getProducts' });
        }
      })
    }
  },

  effects: {
    *getProducts({ payload }, { call, put }) { // eslint-disable-line
      const products = [
        {
          productCode: 'P0001',
          productImg: null,
          productName: '杯子',
          productType: '餐具',
          productUnit: '个'
        }, {
          productCode: 'p0002',
          productImg: null,
          productName: '床单',
          productType: '床品',
          productUnit: '条'
        }, {
          productCode: 'p0003',
          productImg: null,
          productName: '字典',
          productType: '书',
          productUnit: '本'
        }
      ];
      yield put({
        type: 'getProductsSuccess',
        payload: products
      });
    },

    *saveProduct({ payload: data }, { call, put }) {

      //
      yield put({
        type: 'changePageType',
        payload: 'show'
      });

      yield put({
        type: 'initCurrentProduct'
      });
    }
  },

  reducers: {
    initState(state, action) {
      return { ...state, pageType: 'show', breadcrmbItems: defaultBreadcrumb, currProduct: null };
    },

    getProductsSuccess(state, { payload: products }) {
      return { ...state, products }
    },

    changePageType(state, { payload: pageType }) {
      return { ...state, pageType }
    },

    initCurrentProduct(state, action) {
      return { ...state, currProduct: null }
    }

  }
};
