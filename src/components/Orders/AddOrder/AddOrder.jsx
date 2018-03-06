import React from 'react';
import { connect } from 'dva';
import OrderTitle from '../OrderCommon/OrderTitle/OrderTitle';
import CustomersForm from '../OrderCommon/CustomersForm/CustomersForm';
import OrderGrid from '../OrderCommon/OrderGrid/OrderGrid';

function AddOrder({dispatch, orders}) {
  const { customers, productList, order} = orders;
  console.log(order);
  const { orderNumber } = order;

  function selectProduct(productId) {

  }

  function updateOrder(order) {
    dispatch({
      type: 'orders/updateOrder',
      payload: order
    })
  }

  return (
    <div>
      <OrderTitle title="门窗出货单" number={orderNumber} />
      <CustomersForm customers={customers} />
      <OrderGrid productList={productList} order={order} updateOrder={updateOrder} />
    </div>
  )
}

function mapStateToProps(state) {
  return { orders: state.orders }
}

export default connect(mapStateToProps)(AddOrder)
