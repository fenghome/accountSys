// import { getSuppliers } from '../services/suppliers';
import request from '../utils/request';

const defaultBreadcrumb = [
  ['首页', '/'],
  ['供应商管理', '/supplier']
]

const defaultState = {
  pageType:'show',
  breadcrumbItems:defaultBreadcrumb,
  suppliers:[],
  currentSupplier:null,
  searchSupplierName:'',
  total:1,
  currentPage:1,
  msg:''
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
    
    *getSuppliers({ payload }, { call, put }) {
      const res = yield call(request,`/api/suppliers`,{method:'GET'});
      console.log(res);
      let suppliers = [];
      if(res.data && res.data.success){
        suppliers = res.data.suppliers;
      }
      yield put({ type:'getSuppliersSuccess',payload:suppliers});
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
      const res = yield call(request,`/api/suppliers`,{
        method:'POST',
        body:JSON.stringify(supplier)
      })
      if( res.data && res.data.success ){
        yield put({ type:'initState'});
      }else{
        yield put({ type: 'setMessage',payload:'新增失败' });
      }
    },

    *updateSupplier({ payload:supplier},{call,put,select}){
      const supplierId = yield select(state=>state.suppliers.currentSupplier._id);
      console.log('supplierId',supplierId);
      const res = yield call(request,`/api/suppliers/${supplierId}`,{
        method:'PUT',
        body:supplier
      });
      if( res.data && res.data.success){
        yield put({ type:'initState'});
      }else{
        yield put({ type:'setMessage',payload:'编辑失败'});
      }
    }
  },

  reducers: {
    setDefaultState(state,action){
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

    setMessage( state, { payload: msg}){
      return { ...state, msg }
    }
  },

};
