const defaultProduct = {
  key:'0',
  productId:'',
  productName:'',
  quantify:0,
  productUnit:'',
  price:0,
  amount:0,
  remarks:''
};

const defaultStorage = {
  sequence:null,
  noteNumber:'',
  supplierId:null,
  products: [
    {...defaultProduct}
  ],
  totalAmount:0,
  paymentAmount:0,
  mem:''
};

export default {

  namespace: 'storages',

  state: {
    pageType:'',
    list:[],
    timeRange:[],
    supplierId:'',
    NoteNumber:'',
    current:null,
    currentItem:{},
    breadcrumbITems:[
      ['/','首页'],
      ['/storage','入库'],
    ],
    storageData:{ ...defaultStorage },
    suppliers:[],
    productList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
