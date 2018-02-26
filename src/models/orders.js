
export default {

  namespace: 'orders',

  state: {
    pageType: 'show', //show,edit,add
    breadcrumbItems: [
      ['首页', '/index'],
      ['订单', '/orders']
    ],
    customers: [
      { _id: 1, customerName: 'zs' },
      { _id: 2, customerName: 'zsaa' },
    ]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/orders') {
          dispatch({
            type: 'changePageType',
            payload:'show'
          });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    changePageType(state, { payload: pageType }) {
      const breadcrumbItems = [
        ['首页', '/index'],
        ['订单', '/orders']
      ];
      if (pageType === 'add') {
        breadcrumbItems.push(['新增订单', '/orders/addorder']);
      }
      if (pageType === 'edit') {
        breadcrumbItems.push(['修改订单', '/orders/modifyorder']);
      }
      return { ...state, pageType, breadcrumbItems };
    },
  },

};
