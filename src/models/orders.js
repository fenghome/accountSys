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
  customerName:null,
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
    pageType: 'show', //show,modify,add
    breadcrumbItems: [],
    orders: [],
    customers: [],
    productList: [],
    order: { ...defaultOrder }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/orders') {
          dispatch({ type: 'initState' })
          dispatch({ type: 'getOrders' });
          dispatch({ type: 'getProductList' });
          dispatch({ type: 'getCustomers' });
        }
      });
    },
  },

  effects: {

    *getOrders({ payload }, { call, put }) {
      //访问service获得orders
      const orders = [
        {
          _id: 1,
          sequence: null,
          orderNumber: 'MDC201802270133',
          customerId: 1,
          customerName: '张三',
          products: [
            {
              key: '0',
              productId: 1,
              productName: '桌布',
              quantity: 2,
              productUnit: '个',
              price: 5,
              amount: 10,
              remarks: ''
            }
          ],
          totalAmount: 10,
          paymentAmount: 10,
          mem: 'aaaaa'
        },
        {
          _id: 2,
          sequence: null,
          orderNumber: 'MDC201802270134',
          customerId: 2,
          customerName: '李四',
          products: [
            {
              key: '0',
              productId: 2,
              productName: '餐巾',
              quantity: 3,
              productUnit: '个',
              price: 3,
              amount: 9,
              remarks: ''
            }
          ],
          totalAmount: 9,
          paymentAmount: 9,
          mem: 'bbbb'
        }
      ];
      yield put({
        type: 'getOrdersSuccess',
        payload: orders
      });
    },

    *getProductList({ payload }, { call, put }) {
      //访问service获得products
      const productList = [
        { '_id': 1, productId: 1, productName: '桌布', productUnit: '个', price: 5, },
        { '_id': 2, productId: 2, productName: '餐巾', productUnit: '台', price: 3, },
      ];
      yield put({
        type: 'getProductListSuccess',
        payload: productList
      });
    },

    *getCustomers({ payload }, { call, put }) {
      const customers = [
        { '_id': 1, customerName: '张三' },
        { '_id': 2, customerName: '李四' }
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
          // pageType: 'add',
          sequence: 'sequence',
          orderNumber: 'MDC201803010135'
        }
      })
    },

    *getOrderById({ payload: orderId }, { call, put, select }) {
      //远程获得order
      //在这里我模拟获得的order
      const orders = yield select(state => state.orders.orders);
      console.log('model orders is', orders);
      yield put({
        type: 'getOrderByIdSuccess',
        payload: {
          // pageType: 'modify',
          order: orders[orderId - 1]
        }
      });

    }
  },

  reducers: {
    initState(state, action) {
      return { ...state, pageType: 'show', breadcrumbItems: defaultBreadcrumbItems }
    },

    changePageType(state, { payload: pageType }) {
      return { ...state, pageType }
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
      const { sequence, orderNumber } = action.payload;
      const order = state.order;
      const newOrder = { ...order, sequence, orderNumber };
      return { ...state, order: newOrder };
    },

    getOrderByIdSuccess(state, action) {
      const { order } = action.payload;
      return { ...state, order };
    },

    addBreadcrumbItem(state, action) {
      const breadcrumbItems = state.breadcrumbItems;
      const newItems = [...breadcrumbItems, action.payload.item];
      return { ...state, breadcrumbItems: newItems }
    },

    updateOrder(state, { payload: order }) {
      return { ...state, order }
    },

    changeOrderMem(state, { payload: mem }) {
      const newOrder = { ...state.order, mem }
      return { ...state, order: newOrder }
    }
  },

}
