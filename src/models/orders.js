import request from '../utils/request';

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
  sequence: '',
  orderNumber: '',
  customerId: '',
  customerName: '',
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
    order: { ...defaultOrder },
    msg: ''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/orders') {
          dispatch({
            type: 'setDefaultState'
          })
        }
      });
    },
  },

  effects: {

    *setDefaultState(action, { put }) {
      yield put({ type: 'initState' });
      yield put({ type: 'getOrders' });
      yield put({ type: 'getProductList' });
      yield put({ type: 'getCustomers' });
    },

    *getOrders({ payload }, { call, put }) {
      //访问service获得orders
      const res = yield call(request, `/api/order`, {
        method: 'GET'
      })
      if (res.data && res.data.success) {
        yield put({
          type: 'getOrdersSuccess',
          payload: res.data.orders
        });
      }
    },

    *getProductList({ payload }, { call, put }) {
      //访问service获得products
      const res = yield call(request, `/api/products`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'getProductListSuccess',
          payload: res.data.products
        });
      } else {
        yield put({
          type: 'setMessage',
          payload: '获取产品列表错误'
        })
      }
    },

    *getCustomers({ payload }, { call, put }) {
      const res = yield call(request, `/api/customers`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'getCustomersSuccess',
          payload: res.data.customers
        })
      } else {
        yield put({
          type: 'setMessage',
          payload: '获取客户列表失败'
        })
      }
    },

    *getOrderNumber({ payload }, { call, put }) {
      const res = yield call(request, `/api/order/getordernumber`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'getOrderNumberSuccess',
          payload: res.data.orderNumber
        })
      }
    },

    *saveOrder({ payload }, { call, put, select }) {
      const { order } = yield select(state => state.orders);

      const res = yield call(request, `/api/order`, {
        method: 'POSt',
        body: JSON.stringify(order)
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'setDefaultState'
        });
      } else {
        yield put({
          type: 'setMessage',
          payload: '新增订单失败'
        })
      }
    }

  },

  reducers: {
    initState(state, action) {
      return { ...state, pageType: 'show', breadcrumbItems: [...defaultBreadcrumbItems] }
    },

    changePageType(state, { payload: pageType }) {
      return { ...state, pageType }
    },

    getOrdersSuccess(state, { payload: orders }) {
      return { ...state, orders }

    },

    setDefaultOrder(state, action) {
      return { ...state, order: { ...defaultOrder } }
    },

    setOrder(state, { payload: order }) {
      return { ...state, order }
    },

    getProductListSuccess(state, { payload: productList }) {
      return { ...state, productList }
    },

    getCustomersSuccess(state, { payload: customers }) {
      return { ...state, customers }
    },

    getOrderNumberSuccess(state, { payload: orderNumber }) {
      const order = { ...state.order, orderNumber };
      return { ...state, order };
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

    addOrederProduct(state, { payload: index }) {
      const product = { ...defaultProduct };
      const products = [...state.order.products];
      products.splice(index + 1, 0, product);
      const newProducts = products.map((item, i) => {
        return { ...item, key: i }
      })
      const order = { ...state.order, products: newProducts };
      return { ...state, order }
    },

    deleteOrderProduct(state, { payload: index }) {
      const products = [...state.order.products];
      if (products.length > 1) {
        products.splice(index, 1);
        const order = { ...state.order, products };
        return { ...state, order };
      }
    },

    updateOrderProduct(state, { payload: { index, obj } }) {
      const products = [...state.order.products];
      products[index] = { ...state.order.products[index], ...obj };
      products[index].amount = products[index].quantity * products[index].price;
      const order = { ...state.order, products };
      return { ...state, order };
    },

    updateTotalAmount(state, action) {
      let totalAmount = 0;
      state.order.products.forEach((item, index) => {
        totalAmount += item.amount;
      });
      const order = { ...state.order, totalAmount };
      return { ...state, order };
    },

    updatePaymentAmount(state, { payload: paymentAmount }) {
      const order = { ...state.order, paymentAmount };
      return { ...state, order };
    },

    updateOrderCustomer(state, { payload: { customerId, customerName } }) {
      const order = { ...state.order, customerId, customerName };
      return { ...state, order };
    },

    updateOrderMem(state, { payload: mem }) {
      const order = { ...state.order, mem }
      return { ...state, order }
    },

    updateOrder(state, { payload: order }) {
      return { ...state, order }
    },


  },

}
