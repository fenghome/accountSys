import React from 'react';

import { orderTitle, orderNumber } from './index.css';
export default function OrderTitle({number}){
  return (
    <div className={orderTitle}>
      门窗出货单
      <div className={orderNumber}>
        {number}
      </div>
    </div>
  )
}
