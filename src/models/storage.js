import request from '../utils/request';
import qs from 'qs';
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
  sequence: 0,
  noteNumber: '',
  supplierId: null,
  supplierName: null,
  products: [
    { ...defaultProduct }
  ],
  totalAmount: 0,
  paymentAmount: 0,
  mem: '',
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
  list: [],
  storageSingle: { ...defaultStorage },
  suppliers: [],
  productList: [],
  currentPage: 1,
  total: 1,
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

    *getList({ payload: values }, { call, put, select }) {
      const { currentPage } = yield select(state => state.storage);
      values = { currentPage, ...values };
      const params = qs.stringify(values);
      const res = yield call(request, `/api/storage?${params}`, {
        method: 'GET'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'setTotal',
          payload: res.data.total
        })
        yield put({
          type: 'getListSuccess',
          payload: res.data.list
        })
      }
    },

    *getSuppliers({ payload }, { call, put }) {  // eslint-disable-line
      const res = yield call(request, `/api/suppliers/all`, {
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
      const res = yield call(request, `/api/products/all`, {
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
      yield put({
        type: 'initStorageSingle'
      });
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

    *getStorage({ payload: storageSingle }, { call, put, select }) {
      //根据noteNumber得到storageSingle

      yield put(
        {
          type: 'updateStorageSingle',
          payload: storageSingle
        }
      )
    },

    *saveStorage({ payload: storageSingle }, { call, put, select }) {
      const res = yield call(request, `/api/storage/`, {
        method: 'POST',
        body: JSON.stringify(storageSingle)
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'initState'
        })
      } else {
        yield put({
          type: 'setMessage',
          payload: '新增失败'
        })
      }
    },

    *updateStorage({ payload: storageSingle }, { call, put }) {
      const storageId = storageSingle._id;
      const res = yield call(request, `/api/storage/${storageId}`, {
        method: 'PUT',
        body: JSON.stringify(storageSingle)
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'initState'
        })
      } else {
        yield put({
          type: 'setMessage',
          payload: '修改失败'
        })
      }
    },

    *deleteStorage({ payload: storageId }, { call, put }) {
      const res = yield call(request, `/api/storage/${storageId}`, {
        method: 'DELETE'
      });
      if (res.data && res.data.success) {
        yield put({
          type: 'initState'
        })
      } else {
        yield put({
          type: 'setMessage',
          payload: '删除失败'
        })
      }
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
      let products = [...state.storageSingle.products];
      products[index] = { ...products[index], ...obj };
      products[index].amount = products[index].quantity * products[index].price;
      let storageSingle = { ...state.storageSingle, products };
      return { ...state, storageSingle };
    },

    calculateTotalAmount(state, action) {
      let totalAmount = 0;
      for (let i of state.storageSingle.products) {
        totalAmount = parseInt(totalAmount) + parseInt(i.amount);
      }
      let storageSingle = { ...state.storageSingle, totalAmount };
      return { ...state, storageSingle };
    },

    addStorageSingleProduct(state, { payload: index }) {
      let products = [...state.storageSingle.products]
      products.splice(index + 1, 0, { ...defaultProduct });
      const newProducts = products.map(function (item, i) {
        return { ...item,key:i}
      });
      let storageSingle = { ...state.storageSingle, products:newProducts };
      return { ...state, storageSingle };
    },

    deleteStorageSingleProduct(state, { payload: index }) {
      let products = [...state.storageSingle.products];
      if (index == 0) {
        products = [{ ...defaultProduct }];
      } else {
        products.splice(index, 1);
      }
      let storageSingle = { ...state.storageSingle, products };
      return { ...state, storageSingle };
    },

    upadteStorageSinglePaymentAmount(state, { payload: paymentAmount }) {
      const storageSingle = { ...state.storageSingle, paymentAmount };
      return { ...state, storageSingle };
    },

    initStorageSingle(state, action) {
      return { ...state, storageSingle: { ...defaultStorage } };
    },

    updateStorageSingle(state, { payload: storageSingle }) {
      return { ...state, storageSingle };
    },

    changeStorageSingleMem(state, { payload: mem }) {
      const storageSingle = { ...state.storageSingle, mem }
      return { ...state, storageSingle };
    },

    setCurrentPage(state, { payload: currentPage }) {
      return { ...state, currentPage };
    },

    setTotal(state, { payload: total }) {
      return { ...state, total };
    },

    setMessage(state, { payload: msg }) {
      return { ...state, msg };
    }
  },

};
