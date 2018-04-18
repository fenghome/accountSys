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
  sequence: null,
  orderNumber: '',
  customerId: null,
  customerName: null,
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
    msg:''
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
      const res = yield call(request,`/api/order`,{
        method:'GET'
      })
      if(res.data && res.data.success){
        yield put({
          type: 'getOrdersSuccess',
          payload: res.data.orders
        });
      }
    },

    *getProductList({ payload }, { call, put }) {
      //访问service获得products
      const res = yield call(request,`/api/products`,{
        method:'GET'
      });
      if(res.data && res.data.success){
        yield put({
          type: 'getProductListSuccess',
          payload: res.data.porducts
        });
      }else{
        yield put({
          type:'setMessage',
          payload:'获取产品列表错误'
        })
      }
    },

    *getCustomers({ payload }, { call, put }) {
      const res = yield call(request,`/api/customers`,{
        method:'GET'
      });
      if(res.data && res.data.success){
        yield put({
          type: 'getCustomersSuccess',
          payload: res.data.customers
        })
      }else{
        yield put({
          type:'setMessage',
          payload:'获取客户列表失败'
        })
      }
    },

    *getOrderNumber({ payload }, { call, put }) {
      const res = yield call(request,`/api/order/getordernumber`,{
        method:'GET'
      });
      if(res.data && res.data.success){
        yield put({
          type:'getOrderNumberSuccess',
          payload:res.data.orderNumber
        })
      }
    },

    *getOrderById({ payload: orderId }, { call, put, select }) {
      //远程获得order
      //在这里我模拟获得的order
      const orders = yield select(state => state.orders.orders);
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
      return { ...state, pageType: 'show', breadcrumbItems: [...defaultBreadcrumbItems ] }
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

    getOrderNumberSuccess(state, {payload:orderNumber}) {
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

    updateOrder(state, { payload: order }) {
      return { ...state, order }
    },

    changeOrderMem(state, { payload: mem }) {
      const newOrder = { ...state.order, mem }
      return { ...state, order: newOrder }
    }
  },

}
