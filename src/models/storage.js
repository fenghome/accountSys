import request from '../utils/request';
const defaultProduct = {
  key: 0,
  productId: '',
  productName: '',
  quantity: 0,
  productUnit: '',
  price: 0,
  amount: 0,
  remarks: ''
};

const defaultStorage = {
  sequence: null,
  noteNumber: '',
  supplierId: null,
  supplierName: null,
  supplierFormMsg: '',
  products: [
    { ...defaultProduct }
  ],
  totalAmount: 0,
  paymentAmount: 0,
  mem: '',
  msg: ''
};

const defaultState = {
  pageType: 'show',
  breadcrumbItems: [
    ['首页', ''],
    ['入库', 'show'],
    // ['新增','add'],
    // ['编辑','modify'],
    // ['详情','details'],
  ],
  timeRange: [],
  searchSupplierName: '',
  searchStorageId: '',
  list: [
    {
      sequence: null,
      noteNumber: '',
      supplierId: '',
      supplierName: '',
      products: [
        {
          key: '0',
          productId: '',
          productName: '',
          quantity: 0,
          productUnit: '',
          price: 0,
          amount: 0,
          remarks: ''
        }
      ],
      totalAmount: '',
      paymentAmount: '',
      mem: ''
    }
  ],
  storageSingle: { ...defaultStorage },
  suppliers: [],
  productList: [],
  msg: ''
}

export default {

  namespace: 'storage',

  state: defaultState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/storage') {
          dispatch({ type: 'initState' });
        }
      });
    },
  },

  effects: {
    *initState({ payload }, { call, put }) {
      yield put({ type: 'setDefaultState' });
      yield put({ type: 'getList' });
      yield put({ type: 'getSuppliers' });
      yield put({ type: 'getproductList' });
    },

    *getList({ payload }, { call, put }) {
      const res = yield call(request, `/api/storage`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'getListSuccess',
          payload: res.data.list
        })
      }
    },

    *getSuppliers({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(request, `/api/suppliers`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'getSuppliersSuccess',
          payload: res.data.suppliers
        });
      }
    },

    *getproductList({ payload }, { call, put }) {
      const res = yield call(request, `/api/products`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'getProductListSuccess',
          payload: res.data.products
        })
      }
    },

    *addStorage({ payload }, { call, put }) {
      const res = yield call(request, `/api/storage/getnotenumber`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        const newStorageSingle = { ...defaultStorage, noteNumber: res.data.noteNumber };
        yield put({
          type: 'addStorageSuccess',
          payload: newStorageSingle
        });
      } else {
        yield put({
          type: 'initState'
        });
        yield put({
          type: 'setMessage',
          payload: '出库单生成失败'
        })
      }
    },

    *getStorageById({ payload: noteNumber }, { call, put, select }) {
      //根据noteNumber得到storageSingle
      const list = yield select(state => state.storage.list);
      const storageSingle = list.find(item => item.noteNumber === noteNumber);
      yield put(
        {
          type: 'updateStorageSingle',
          payload: storageSingle
        }
      )
    },

    *saveStorage({ payload: values }, { call, put, select }) {

    }
  },

  reducers: {
    setDefaultState(state, action) {
      return { ...defaultState };
    },

    changePageType(state, { payload: pageType }) {
      let breadcrumbItems = [];
      switch (pageType) {
        case 'add':
          breadcrumbItems = [['首页', ''], ['入库', 'show'], ['新增', 'add']];
          break;
        case 'modify':
          breadcrumbItems = [['首页', ''], ['入库', 'show'], ['修改', 'modify']];
          break;
        case 'details':
          breadcrumbItems = [['首页', ''], ['入库', 'show'], ['详情', 'details']];
          break;
        default:
          breadcrumbItems = [['首页', ''], ['入库', 'show']];
          break;
      }
      return { ...state, pageType, breadcrumbItems }
    },

    getListSuccess(state, { payload: list }) {
      return { ...state, list };
    },

    getSuppliersSuccess(state, { payload: suppliers }) {
      return { ...state, suppliers };
    },

    getProductListSuccess(state, { payload: productList }) {
      return { ...state, productList };
    },

    addStorageSuccess(state, { payload: newStorageSingle }) {
      return { ...state, storageSingle: newStorageSingle };
    },

    updateStorageSingleProduct(state, { payload: { index, obj } }) {
      let newState = { ...state };
      const newProduct = { ...newState.storageSingle.products[index], ...obj }
      newProduct.amount = newProduct.quantity * newProduct.price;
      newState.storageSingle.products[index] = newProduct;
      return newState;
    },

    calculateTotalAmount(state, action) {
      let totalAmount = 0;
      for (let i of state.storageSingle.products) {
        totalAmount = parseInt(totalAmount) + parseInt(i.amount);
      }
      let newState = { ...state }
      newState.storageSingle.totalAmount = totalAmount;
      return newState;
    },

    addStorageSingleProduct(state, { payload: index }) {
      let newState = { ...state };
      let { products } = newState.storageSingle;
      products.splice(index + 1, 0, { ...defaultProduct });
      products.forEach(function (item, i, arr) {
        arr[i].key = i;
      });
      return newState;
    },

    deleteStorageSingleProduct(state, { payload: index }) {
      let newState = { ...state };
      if (index == 0) {
        newState.storageSingle.products = [defaultProduct];
      } else {
        newState.storageSingle.products.splice(index, 1);
      }
      return newState;
    },

    upadteStorageSinglePaymentAmount(state, { payload: paymentAmount }) {
      const storageSingle = { ...state.storageSingle, paymentAmount };
      return { ...state, storageSingle };
    },

    updateStorageSingle(state, { payload: storageSingle }) {
      return { ...state, storageSingle };
    },

    changeStorageSingleMem(state, { payload: mem }) {
      const storageSingle = { ...state.storageSingle, mem }
      return { ...state, storageSingle };
    },

    setStorageSingleMsg(state, { payload: msg }) {
      const storageSingle = { ...state.storageSingle, msg };
      return { ...state, storageSingle };
    },

    setMessage(state, { payload: msg }) {
      return { ...state, msg };
    }
  },

};
