import {create,getCustomers,getCustomerById} from '../services/customers';
const defaultBreadcrumb = [
  ['首页', '/'],
  ['客户管理', '/customer']
];
export default {

  namespace: 'customers',

  state: {
    pageType: 'show',
    breadcrumbItems: defaultBreadcrumb,
    customers: null,
    currentCustomer: null,
  },

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
        type: 'changePageType',
        payload: 'show'
      });
      yield put({
        type: 'initBreadcreumb'
      });
      yield put({
        type: 'getCustomers'
      });
      yield put({
        type: 'initCurrentCustomer'
      });
    },

    *getCustomers({ payload }, { call, put }) {  // eslint-disable-line
      //异步操作，获取customers
      const res = yield call(getCustomers);
      const customers = res.data.success ? res.data.customers : {};
      console.log('cuslist',customers);
      yield put({
        type:'getCustomersSuccess',
        payload:customers
      });
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
      const data = yield call(create, customer);
      //异步保存
      //成功
      yield put({ type: 'initCustomers' });
      //失败
    },

    *updateCustomer({ payload: customer},{ call, put, select }){
      const customerId = yield select(({customers})=>{ return customers.currentCustomer._id});
      const newCustomer = { ...customer,customerId};
      const res = yield call(getCustomerById,newCustomer)
      if(res.data.success){
        yield put({ type:'initCustomers' });
      }
    },

    *deleteCustomer({ payload: customerId},{ call, put}){
      const res = yield call(deleteCustomerById,customerId);
    }
  },

  reducers: {
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

    setCurrentCustomer(state, { payload: currentCustomer }) {
      return { ...state, currentCustomer }
    },
  },

};
