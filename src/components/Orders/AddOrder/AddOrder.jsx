import React from 'react';
import OrderTitle from '../OrderCommon/OrderTitle/OrderTitle';
import CustomersForm from '../OrderCommon/CustomersForm/CustomersForm';

export default function AddOrder({number,customers}){

  return (
    <div>
      <OrderTitle title="门窗出货单" number={number}/>
      <CustomersForm customers={customers} />
    </div>
  )
}
