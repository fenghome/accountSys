import React from 'react';
import { connect } from 'dva';
import OrderTitle from '../OrderCommon/OrderTitle/OrderTitle';
import CustomersForm from '../OrderCommon/CustomersForm/CustomersForm';
import OrderGrid from '../OrderCommon/OrderGrid/OrderGrid';

function AddOrder({orders}){

  const {customers,productList,order:{orderNumber}} = orders;

  function selectProduct(productId){

  }

  return (
    <div>
      <OrderTitle title="门窗出货单" number={orderNumber}/>
      <CustomersForm customers={customers} />
      <OrderGrid productList={productList} />
    </div>
  )
}

function mapStateToProps(state){
  return {orders:state.orders}
}

export default connect(mapStateToProps)(AddOrder)
