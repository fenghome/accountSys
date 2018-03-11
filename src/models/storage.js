const defaultProduct = {
  key: '0',
  productId: '',
  productName: '',
  quantify: 0,
  productUnit: '',
  price: 0,
  amount: 0,
  remarks: ''
};

const defaultStorage = {
  sequence: null,
  noteNumber: '',
  supplierId: null,
  supplierName:null,
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
      sequence:null,
      noteNumber:'',
      supplierId:'',
      supplierName:'',
      products:[
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
      totalAmount:'',
      paymentAmount:'',
      mem:''
    }
  ],
  timeRange: [],
  supplierId: '',  
  current: null,
  currentItem: {},
  breadcrumbItems: [
    ['/', '首页'],
    ['/storage', '入库'],
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
      history.listen(({ patname }) => {
        if (pathname === '/storage') {
          dispatch({ type: 'initState' });
          dispatch({ type: 'getSuppliers' });
          dispatch({ type: 'getproductList' });
        }
      });
    },
  },

  effects: {
    *getSuppliers({ payload }, { call, put }) {  // eslint-disable-line
      const suppliers = [
        {
          _id:0,
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
          productName: '锤子'
        }
      ];

      yield put({
        type: 'getProductListSuccess',
        payload: productList
      })
    },

    *getStorageNumber({payload},{call,put}){

    },

    *getStorageById({payload},{call,put}){
      
    }
  },

  reducers: {
    initState(state, action) {
      return { ...initState };
    },

    getSuppliers(state, { payload: suppliers }) {
      return { ...state, suppliers }
    },

    getProductListSuccess(state, { payload: productList }) {
      return { ...state, productList }
    }
  },

};
