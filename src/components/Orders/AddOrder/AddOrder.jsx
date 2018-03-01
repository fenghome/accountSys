import React from 'react';
import OrderTitle from '../OrderCommon/OrderTitle/OrderTitle';

export default function AddOrder({number}){
  return (
    <div>
      <OrderTitle title="门窗出货单" number={number}/>
    </div>
  )
}
