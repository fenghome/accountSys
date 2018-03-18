const defaultBreadcrumb = [
  ['首页', '/'],
  ['供应商管理', '/supplier']
]

export default {

  namespace: 'suppliers',

  state: {
    pageType: 'show',
    breadcrumbItems: defaultBreadcrumb,
    suppliers: null,
    currentSupplier: null,
  },

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
      yield put({ type: 'getSuppliers' });
      yield put({ type: 'initBreadcrumbItems' });
      yield put({ type: 'changePageType', payload: 'show' });
      yield put({ type: 'setCurrentSupplier', payload: null });
    },

    *getSuppliers({ payload }, { call, put }) {
      const suppliers = [
        {
          _id: '0',
          supplierName: '中邮科技',
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
          supplierName: '大众科技',
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
          supplierName: '银凯集团',
          contactPeople: '王五',
          contactPhone: '1223545687',
          address: '建设大街66号',
          mem: '',
          accountName: '',
          accountBank: '',
          accountNo: '',
        },
      ]
      yield put({ type: 'getSuppliersSuccess', payload: suppliers });
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
      //更新supplier

      yield put({ type: 'initState' });
    }
  },

  reducers: {
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
    }
  },

};
