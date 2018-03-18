import * as customersService from '../services/customers';
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
            type: 'changePageType',
            payload: 'show'
          });
          dispatch({
            type: 'initBreadcreumb'
          });
          dispatch({
            type: 'getCustomers'
          });
          dispatch({
            type: 'initCurrentCustomer'
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
      const customers = [
        {
          _id: '0',
          customerName: '中邮科技',
          contactPeople: '张三',
          contactPhone: '86951197',
          address: '新开路58号',
          mem: '',
          accountName: '',
          accountBank: '',
          accountNo: '',
        },
        {
          _id: '1',
          customerName: '大众科技',
          contactPeople: '李四',
          contactPhone: '13966555568',
          address: '东方大厦',
          mem: '',
          accountName: '',
          accountBank: '',
          accountNo: '',
        },
        {
          _id: '2',
          customerName: '银凯集团',
          contactPeople: '王五',
          contactPhone: '1223545687',
          address: '建设大街66号',
          mem: '',
          accountName: '',
          accountBank: '',
          accountNo: '',
        },
      ];

      yield put({
        type: 'getCustomersSuccess',
        payload: customers
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
      const data = yield call(customersService.create(customer));
      //异步保存
      //成功
      yield put({ type: 'initCustomers' });
      //失败
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
