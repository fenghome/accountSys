import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import OrderTitle from '../OrderCommon/OrderTitle/OrderTitle';
import CustomersForm from '../OrderCommon/CustomersForm/CustomersForm';
import OrderGrid from '../OrderCommon/OrderGrid/OrderGrid';
import RemarksForm from '../OrderCommon/RemarksForm/RemarksForm';
import { buttonGroup, btnOk, btnCanel } from './index.css';

function ModifyOrder({ dispatch, orders, disabled = false }) {
  const { customers, productList, order } = orders;
  const { orderNumber, customerName } = order;

  function selectProduct(productId) {

  }

  function updateOrder(order) {
    dispatch({
      type: 'orders/updateOrder',
      payload: order
    })
  }

  function changeOrderMem(mem) {
    dispatch({
      type: 'orders/changeOrderMem',
      payload: mem
    })
  }

  return (
    <div>
      <OrderTitle title="门窗出货单" number={orderNumber} />

      <CustomersForm
        customers={customers}
        selectCustomerName={customerName}
        disabled={disabled} />

      <OrderGrid
        productList={productList}
        order={order}
        updateOrder={updateOrder}
        disabled={disabled} />

      <RemarksForm
        defaultValue={order.mem}
        changeOrderMem={changeOrderMem}
        disabled={disabled} />
      {
        disabled ||
        <div className={buttonGroup}>
          <Button type="primary" className={btnOk}>确定</Button>
          <Button className={btnCanel}>取消</Button>
        </div>
      }
    </div>
    )
}

function mapStateToProps(state) {
  return {orders: state.orders }
}

export default connect(mapStateToProps)(ModifyOrder)
