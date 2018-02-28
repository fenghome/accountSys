import React from 'react';

import { orderTitle, orderNumber } from './index.css';
export default function OrderTitle({title,number}){
  return (
    <div className={orderTitle}>
      {title}
      <div className={orderNumber}>
        {number}
      </div>
    </div>
  )
}
