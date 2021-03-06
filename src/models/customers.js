import { create, getCustomers, updateCustomerById, deleteCustomerById,searchCustomers } from '../services/customers';
const defaultBreadcrumb = [
  ['首页', '/'],
  ['客户管理', '/customer']
];

const defaultState = {
  pageType: 'show',
  searchCustomerName:'',
  breadcrumbItems: defaultBreadcrumb,
  customers: null,
  currentCustomer: null,
  total:1,
  currentPage:1,
  msg: ''
}
export default {

  namespace: 'customers',

  state: defaultState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/customer') {
          dispatch({
            type: 'initCustomers'
          });
        }
      })
    },
  },

  effects: {

    *initCustomers({ payload }, { call, put }) {
      yield put({
        type: 'initState'
      });
      yield put({
        type: 'getCustomers'
      });
    },

    *getCustomers({ payload }, { call, put, select }) {  // eslint-disable-line
      const {searchCustomerName, currentPage } = yield select(state=>{return state.customers})
      let params = {};
      searchCustomerName && (params.searchCustomerName = searchCustomerName);
      currentPage && (params.currentPage = currentPage);
      const res = yield call(getCustomers,params);
      const {data = {}} = res;
      const { customers=null,total=1,current=1} = data;
      yield put({
        type:'setTotalPage',
        payload:total
      });
      yield put({
        type:'setCurrentPage',
        payload:current
      });
      yield put({
        type: 'getCustomersSuccess',
        payload: customers
      });
    },

    *searchCustomers({ payload:customerName},{call,put}){
      const res = yield call(searchCustomers,customerName);
    },

    *changeToAddPage({ payload }, { call, put }) {
      yield put({ type: 'changePageType', payload: 'add' });
      yield put({ type: 'addBreadcreumbItem', payload: ['新增客户', '/customer/add'] });
      yield put({ type: 'initCurrentCustomer' });
    },

    *changeToModifyPage({ payload: currentCustomer }, { call, put }) {
      yield put({ type: 'changePageType', payload: 'modify' });
      yield put({ type: 'addBreadcreumbItem', payload: ['编辑客户', '/customer/modify'] });
      yield put({ type: 'setCurrentCustomer', payload: currentCustomer });
    },

    *changeToDetailsPage({ payload: currentCustomer }, { call, put }) {
      yield put({ type: 'changePageType', payload: 'details' });
      yield put({ type: 'addBreadcreumbItem', payload: ['浏览客户', '/customer/details'] });
      yield put({ type: 'setCurrentCustomer', payload: currentCustomer });
    },

    *saveCustomer({ payload: customer }, { call, put }) {
      const res = yield call(create, customer);
      if (res && res.data.success) {
        yield put({ type: 'initCustomers' });
      } else {
        yield put({ type: 'setMessage', payload: '新增失败' })
      }
    },

    *updateCustomer({ payload: customer }, { call, put, select }) {
      const customerId = yield select(({ customers }) => { return customers.currentCustomer._id });
      const newCustomer = { ...customer, customerId };
      const res = yield call(updateCustomerById, newCustomer)
      if (res && res.data && res.data.success) {
        yield put({ type:'changePageType',payload:'show'});
        yield put({ type: 'getCustomers' });
      } else {
        yield put({ type: 'setMessage', payload: '编辑失败' });
      }
    },

    *deleteCustomer({ payload: customerId }, { call, put }) {
      const res = yield call(deleteCustomerById, customerId);
      if (res && res.data && res.data.success) {
        yield put({ type: 'initCustomers' });
      } else {
        yield put({ type: 'setMessage', payload: '删除失败' });
      }
    }
  },

  reducers: {
    initState(state,action){
      return { ...defaultState };
    },
    changePageType(state, { payload: pageType }) {
      return { ...state, pageType };
    },

    initBreadcreumb(state, action) {
      return { ...state, breadcrumbItems: defaultBreadcrumb }
    },

    addBreadcreumbItem(state, { payload: items }) {
      const breadcrumbItems = [...state.breadcrumbItems, items]
      return { ...state, breadcrumbItems }
    },

    getCustomersSuccess(state, { payload: customers }) {
      return { ...state, customers }
    },

    initCurrentCustomer(state, action) {
      return { ...state, currentCustomer: null }
    },

    setSearchCustomerName(state,{payload:searchCustomerName}){
      return { ...state, searchCustomerName}
    },

    setCurrentCustomer(state, { payload: currentCustomer }) {
      return { ...state, currentCustomer }
    },

    setCurrentPage(state,{payload:currentPage}){
      return { ...state, currentPage}
    },

    setTotalPage(state,{payload:total}){
      return { ...state, total}
    },

    setMessage(state, { payload: msg }) {
      return { ...state, msg }
    }
  },

};
