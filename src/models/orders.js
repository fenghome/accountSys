const defaultProduct = {
  key: '0',
  productId: '',
  productName: '',
  quantity: 0,
  productUnit: '',
  price: 0,
  amount: 0,
  remarks: ''
};

const defaultOrder = {
  sequence: null,
  orderNumber: '',
  customerId: null,
  products: [
    { ...defaultProduct }
  ],
  totalAmount: 0,
  paymentAmount: 0,
  mem: ''
}

const defaultBreadcrumbItems = [
  ['首页', '/index'],
  ['订单', '/orders']
]

export default {

  namespace: 'orders',

  state: {
    pageType: 'show', //show,edit,add
    breadcrumbItems: [],
    orders: [],
    customers: [
      { _id: 1, customerName: 'zs' },
      { _id: 2, customerName: 'zsaa' },
    ],
    productList: [],
    order: { ...defaultOrder }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/orders') {
          dispatch({type:'initState'})
          dispatch({type: 'getOrders'});
          dispatch({type: 'getProductList'});
          dispatch({type:'getCustomers'});
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

    *getProductList({ payload }, { call, put }) {
      //访问service获得products
      const productList = [
        { '_id': 1, productName: 'zss' },
        { '_id': 2, productName: 'ls' },
      ];
      yield put({
        type: 'getProductListSuccess',
        payload: productList
      });
    },

    *getCustomers({ payload }, { call, put }) {
      const customers = [
        { '_id': 1, customerName: '地中海蓝' },
        { '_id': 2, customerName: '米黄绸布' }
      ];
      yield put({
        type: 'getCustomersSuccess',
        payload: customers
      })
    },

    *getOrderNumber({ payload }, { call, put }) {
      // const { data } = yield call(getOrderNumber, {});
      // if (data && data.success) {
      yield put({
        type: 'getOrderNumberSuccess',
        payload: {
          pageType: 'add',
          sequence: 'sequence',
          orderNumber: 'MDC201803010133'
        }
      })
      // }
      yield put({
        type: 'addBreadcrumbItem',
        payload: {
          item: ['新增订单','/orders/addorder']
        }
      });
    },
  },

  reducers: {
    initState(state,payload){
      return { ...state, pageType:'show', breadcrumbItems:defaultBreadcrumbItems}
    },

    getOrdersSuccess(state, { payload: orders }) {
      return { ...state, orders }

    },

    getProductListSuccess(state, { payload: productList }) {
      return { ...state, productList }
    },

    getCustomersSuccess(state, { payload: customers }) {
      return { ...state, customers }
    },

    getOrderNumberSuccess(state, action) {
      const { sequence, orderNumber, pageType } = action.payload;
      const order = state.order;
      const newOrder = { ...order, sequence, orderNumber };
      return { ...state, order: newOrder, pageType };
    },

    addBreadcrumbItem(state, action) {
      const breadcrumbItems = state.breadcrumbItems;
      const newItems = [...breadcrumbItems, action.payload.item];
      return { ...state, breadcrumbItems: newItems }
    }
  },

}
