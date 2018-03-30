const defaultBreadcrumb = [
  ['首页', '/'],
  ['商品管理', '/product']
];

const defautState = {
  pageType: 'show',
  breadcrmbItems: defaultBreadcrumb,
  products: [],
  currProduct: null,
  serachProductName:null,
  total:1,
  currentPage:1,
}

export default {

  namespace: 'products',

  state: defaultStatus,

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
      
      yield put({
        type: 'getProductsSuccess',
        payload: products
      });
    },

    *saveProduct({ payload: data }, { call, put }) {

      //
      yield put({ type: 'initState' });
      yield put({ type: 'getProducts' });

    }
  },

  reducers: {
    initState(state, action) {
      return { ...defaultStatus };
    },

    initBreadcrmbItems(state, action) {
      return { ...state, breadcrmbItems: defaultBreadcrumb }
    },

    initCurrentProduct(state, action) {
      return { ...state, currProduct: null }
    },

    getProductsSuccess(state, { payload: products }) {
      return { ...state, products }
    },

    addBreadcrumb(state, { payload: breadcrmbItem }) {
      const { breadcrmbItems } = state;
      const newBreadcrmbItems = [...breadcrmbItems, breadcrmbItem]
      return { ...state, breadcrmbItems: newBreadcrmbItems }
    },

    changePageType(state, { payload: pageType }) {
      return { ...state, pageType }
    },

    changeCurrentProduct(state, { payload: currProduct }) {
      return { ...state, currProduct }
    }

  }
};
