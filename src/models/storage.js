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

const defaultStorage = {
  sequence: null,
  noteNumber: '',
  supplierId: null,
  supplierName: null,
  products: [
    { ...defaultProduct }
  ],
  totalAmount: 0,
  paymentAmount: 0,
  mem: ''
};

const initState = {
  pageType: 'show',
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
  timeRange: [],
  supplierId: '',
  current: null,
  currentItem: {},
  breadcrumbItems: [
    ['首页', '/'],
    ['入库', '/storage'],
  ],
  storageSingle: { ...defaultStorage },
  suppliers: [],
  productList: []
}

export default {

  namespace: 'storage',

  state: initState,

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname === '/storage') {
          dispatch({ type: 'initState' });
          dispatch({ type: 'getList' });
          dispatch({ type: 'getSuppliers' });
          dispatch({ type: 'getproductList' });
        }
      });
    },
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const list = [
        {
          _id: 1,
          sequence: null,
          createInstance: '2017-06-01',
          noteNumber: 'MDC201802270001',
          supplierId: 1,
          supplierName: '张三',
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
        }
      ];
      yield put({
        type: 'getListSuccess',
        payload: list
      })
    },
    *getSuppliers({ payload }, { call, put }) {  // eslint-disable-line
      const suppliers = [
        {
          _id: 0,
          supplierId: 0,
          supplierName: '张三家'
        }
      ];

      yield put({
        type: 'getSuppliersSuccess',
        payload: suppliers
      });
    },

    *getproductList({ payload }, { call, put }) {
      const productList = [
        {
          productId: 0,
          productName: '锤子',
          productUnit: '个'
        }
      ];
      yield put({
        type: 'getProductListSuccess',
        payload: productList
      })
    },

    *getStorageNumber({ payload }, { call, put }) {
      //模拟服务器产生1个number
      const noteNumber = 'MDC201802270003';
      const newStorageSingle = { ...defaultStorage, noteNumber };
      yield put({
        type:'getStorageNumberSuccess',
        payload: newStorageSingle
      });
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

    }
  },

  reducers: {
    initState(state, action) {
      return { ...initState };
    },

    getListSuccess(state, { payload: list }) {
      return { ...state, list }
    },

    getSuppliersSuccess(state, { payload: suppliers }) {
      return { ...state, suppliers }
    },

    getProductListSuccess(state, { payload: productList }) {
      return { ...state, productList }
    },

    getStorageNumberSuccess(state, { payload: newStorageSingle }) {
      return { ...state, storageSingle: newStorageSingle }
    },

    changePageType(state, { payload: pageType }) {
      return { ...state, pageType }
    },

    updateStorageSingle(state, { payload: storageSingle }) {
      return { ...state, storageSingle }
    },

    changeStorageSingleMem(state, { payload: mem }) {
      const storageSingle = { ...state.storageSingle, mem }
      return { ...state, storageSingle }
    },



  },

};
