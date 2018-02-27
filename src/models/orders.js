
export default {

  namespace: 'orders',

  state: {
    pageType: 'show', //show,edit,add
    breadcrumbItems: [
      ['首页', '/index'],
      ['订单', '/orders']
    ],
    orders: [],
    customers: [
      { _id: 1, customerName: 'zs' },
      { _id: 2, customerName: 'zsaa' },
    ],
    productList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/orders') {
          dispatch({
            type: 'changePageType',
            payload: 'show'
          });
          dispatch({ type: 'getOrders' })
        }
      });
    },
  },

  effects: {
    *getOrders({ payload }, { call, put }) {
      //访问service获得orders
      const orders = [
        {
          serialNumber: '1',
          createInstance: '2018-02-27',
          orderNumber: 'MDC201802270133',
          customerName: 'zs',
          totalAmount: '0',
          paymentAmount: 0,
          mem: 'ssss'
        },
        {
          serialNumber: '2',
          createInstance: '2018-02-27',
          orderNumber: 'MDC201802270134',
          customerName: 'zas',
          totalAmount: 0,
          paymentAmount: 0,
          mem: 'ssss'
        }
      ];
      yield put({
        type: 'getOrdersSuccess',
        payload: orders
      })
    },
    *getProducts({ payload }, { call, put }) {

    },
    *gitOrderNumber({payload},{call,put}){
      const {data} = yield call(getOrderNumber,{});
      if(data && data.success){
        yield put({
          type:'getOrderNumberSuccess',
          payload:{
            pageType:'add',
          }
        })
      }
    }
  },

  reducers: {
    getOrdersSuccess(state, { payload: orders }) {
      return { ...state, orders }

    },
    getOrderNumberSuccess(state,action){

    }
  },

};
