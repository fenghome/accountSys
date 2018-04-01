import { getProducts, saveProduct, removeFile } from '../services/products';

const defaultBreadcrumb = [
  ['首页', '/'],
  ['商品管理', '/product']
];

const defautState = {
  pageType: 'show',
  breadcrmbItems: defaultBreadcrumb,
  products: [],
  currProduct: null,
  searchProductName: '',
  total: 1,
  currentPage: 1,
  msg: ''
}

export default {

  namespace: 'products',

  state: defautState,

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

    *getProducts({ payload }, { call, put, select }) { // eslint-disable-line
      const searchProductName = yield select(state => state.products.searchProductName);
      const params = { searchProductName };
      const res = yield call(getProducts,params);
      let products = [];
      if (res && res.data && res.data.success) {
        products = res.data.products;
      }
      yield put({
        type: 'getProductsSuccess',
        payload: products
      });
    },

    *saveProduct({ payload: data }, { call, put }) {

      const res = yield call(saveProduct, data);
      if (res && res.data && res.data.success) {
        yield put({ type: 'initState' });
        yield put({ type: 'getProducts' });
      } else {
        yield put({ type: 'setMessage', payload: '新增产品失败' });
      }
    },

    *removeFile({ payload: fileName }, { call, put }) {
      const res = yield call(removeFile, fileName);
    }
  },

  reducers: {
    initState(state, action) {
      return { ...defautState };
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
    },

    setSearchProductName(state, { payload: searchProductName }) {
      return { ...state, searchProductName }
    },

    setMessage(state, { payload: msg }) {
      return { ...state, msg }
    }

  }
};
