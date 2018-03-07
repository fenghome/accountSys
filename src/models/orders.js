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
          sequence: null,
          orderNumber: 'MDC201802270133',
          customerId: 1,
          customerName: '张三',
          product: [
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
          men: ''
        },
        {
          sequence: null,
          orderNumber: 'MDC201802270134',
          customerId: 2,
          customerName: '李四',
          product: [
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
          men: ''
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
        { '_id': 1, productName: '桌布', productUnit: '个' },
        { '_id': 2, productName: '餐巾', productUnit: '台' },
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
          pageType: 'add',
          sequence: 'sequence',
          orderNumber: 'MDC201803010135'
        }
      })
      // }
      yield put({
        type: 'addBreadcrumbItem',
        payload: {
          item: ['新增订单', '/orders/addorder']
        }
      });
    },
  },

  reducers: {
    initState(state, payload) {
      return { ...state, pageType: 'show', breadcrumbItems: defaultBreadcrumbItems }
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
    },

    updateOrder(state, { payload: order }) {
      return { ...state, order }
    },

    changeOrderMem(state, { payload: mem }) {
      const newOrder = {...state.order, mem}
      return { ...state, order:newOrder}
    }
  },

}
