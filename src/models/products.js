import { getProducts, saveProduct, removeFile, updateProductById, deleteProductById } from '../services/products';

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
          dispatch({ type: 'initProducts' });
        }
      })
    }
  },

  effects: {
    *initProducts(action, { call, put }) {
      yield put({ type: 'initState' });
      yield put({ type: 'getProducts' });
    },

    *getProducts({ payload }, { call, put, select }) { // eslint-disable-line
      const { searchProductName, currentPage } = yield select(state => state.products);
      const params = { searchProductName, currentPage };
      const res = yield call(getProducts, params);
      const { products = [], total = 1 } = res.data && res.data.success && res.data;
      yield put({
        type: 'setTotal',
        payload: total
      })
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

    *updateProduct({ payload: data }, { call, put, select }) {
      const productId = yield select(state => state.products.currProduct._id);
      data.productId = productId;
      const res = yield call(updateProductById, data);
      if (res.data && res.data.success) {
        yield put({ type: 'initState' });
        yield put({ type: 'getProducts' });
      } else {
        yield put({ type: 'setMessage', payload: '修改产品失败' });
      }
    },

    *deleteProduct({ payload:productId }, { call, put, select }) {
      console.log('product',productId);
      const res = yield call(deleteProductById,productId);
      if(res.data && res.data.success){
        yield put({type:'initProducts'});
      }else{
        yield put({type:'setMessage',payload:'删除产品失败'})
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

    setCurrentPage(state, { payload: currentPage }) {
      return { ...state, currentPage }
    },

    setTotal(state, { payload: total }) {
      return { ...state, total }
    },

    setMessage(state, { payload: msg }) {
      return { ...state, msg }
    }

  }
};
