
export default {

  namespace: 'orders',

  state: {
    pageType: 'show', //show,edit,add
    breadcrumbItems: [
      ['首页', '/index'],
      ['订单', '/orders']
    ],
    orders,
    customers: [
      { _id: 1, customerName: 'zs' },
      { _id: 2, customerName: 'zsaa' },
    ],
		productList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/orders') {
          dispatch({
            type: 'changePageType',
            payload:'show'
          });
          dispatch({type:'getOrders'})
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *getOrders({payload},{call,put}){
      //访问service获得orders
      const orders =[
        {
          serialNumber: '1',
          createInstance:'2018-02-27' ,
          orderNumber:'MDC201802270133',
          customerName:'zs',
          totalAmount:0,
          paymentAmount:0,
          mem:'ssss'
        },
        {
          serialNumber: '2',
          createInstance:'2018-02-27' ,
          orderNumber:'MDC201802270134',
          customerName:'zas',
          totalAmount:0,
          paymentAmount:0,
          mem:'ssss'
        }
      ];
      yield puyt({
        type:'getOrdersSuccess',
        payload:orders
      })
    },
    *getProducts({payload},{call,put}){

    }
  },

  reducers: {
    getOrdersSuccess(state,{ payload:orders }){

    },
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
