// import { getSuppliers } from '../services/suppliers';
import request from '../utils/request';
import qs from 'qs';

const defaultBreadcrumb = [
  ['首页', '/'],
  ['供应商管理', '/supplier']
]

const defaultState = {
  pageType: 'show',
  breadcrumbItems: defaultBreadcrumb,
  suppliers: [],
  currentSupplier: null,
  searchSupplierName: '',
  total: 1,
  currentPage: 1,
  msg: ''
}

export default {

  namespace: 'suppliers',

  state: defaultState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/supplier') {
          dispatch({ type: 'initState' });
        }
      })
    },
  },

  effects: {
    *initState({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'setDefaultState' });
      yield put({ type: 'getSuppliers' });
    },

    *getSuppliers({ payload }, { call, put, select }) {
      const { searchSupplierName, currentPage } = yield select(state => state.suppliers);
      const params = {
        searchSupplierName,
        currentPage
      }
      const res = yield call(request, `/api/suppliers?${qs.stringify(params)}`, { method: 'GET' });
      if (res.data && res.data.success) {
        const { suppliers = [], total = 1 } = res.data;
        yield put({ type: 'getSuppliersSuccess', payload: suppliers });
        yield put({ type:'setTotal',payload:total});
      }
    },

    *changToAddPage({ payload }, { call, put }) {
      yield put({ type: 'changePageType', payload: 'add' });
      yield put({ type: 'addBreadcrumbItems', payload: ['新增供应商', '/supplier/add'] });
      yield put({ type: 'setCurrentSupplier', payload: {} });
    },

    *changToModifyPage({ payload: currentSupplier }, { call, put }) {
      yield put({ type: 'changePageType', payload: 'modify' });
      yield put({ type: 'addBreadcrumbItems', payload: ['编辑供应商', '/supplier/modify'] });
      yield put({ type: 'setCurrentSupplier', payload: currentSupplier });
    },

    *chanToDetailsPage({ payload: currentSupplier }, { call, put }) {
      yield put({ type: 'changePageType', payload: 'details' });
      yield put({ type: 'addBreadcrumbItems', payload: ['浏览供应商', '/supplier/details'] });
      yield put({ type: 'setCurrentSupplier', payload: currentSupplier });
    },

    *saveSupplier({ payload: supplier }, { call, put }) {
      const res = yield call(request, `/api/suppliers`, {
        method: 'POST',
        body: JSON.stringify(supplier)
      })
      if (res.data && res.data.success) {
        yield put({ type: 'initState' });
      } else {
        yield put({ type: 'setMessage', payload: '新增失败' });
      }
    },

    *updateSupplier({ payload: supplier }, { call, put, select }) {
      const supplierId = yield select(state => state.suppliers.currentSupplier._id);
      const res = yield call(request, `/api/suppliers/${supplierId}`, {
        method: 'PUT',
        body: JSON.stringify(supplier)
      });
      if (res.data && res.data.success) {
        yield put({ type: 'initState' });
      } else {
        yield put({ type: 'setMessage', payload: '编辑失败' });
      }
    },

    *deleteSupplier({ payload: supplierId }, { call, put }) {
      const res = yield call(request, `/api/suppliers/${supplierId}`, {
        method: 'DELETE'
      });
      if (res.data && res.data.success) {
        yield put({ type: 'initState' });
      } else {
        yield put({ type: 'setMessage', payload: '删除失败' });
      }
    },
  },

  reducers: {
    setDefaultState(state, action) {
      return { ...defaultState };
    },

    changePageType(state, { payload: pageType }) {
      return { ...state, pageType };
    },

    initBreadcrumbItems(state, action) {
      return { ...state, breadcrumbItems: defaultBreadcrumb }
    },

    addBreadcrumbItems(state, { payload: items }) {
      return { ...state, breadcrumbItems: [...state.breadcrumbItems, items] }
    },

    getSuppliersSuccess(state, { payload: suppliers }) {
      return { ...state, suppliers }
    },

    setCurrentSupplier(state, { payload: currentSupplier }) {
      return { ...state, currentSupplier }
    },

    setSearchSupplierName(state, { payload: searchSupplierName }) {
      return { ...state, searchSupplierName }
    },

    setCurrentPage(state, { payload: currentPage }) {
      return { ...state, currentPage }
    },

    setTotal(state, { payload: total }) {
      return { ...state, total }
    },

    setMessage(state, { payload: msg }) {
      return { ...state, msg }
    },


  },

};
