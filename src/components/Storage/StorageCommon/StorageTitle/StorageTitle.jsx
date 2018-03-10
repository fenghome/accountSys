import React from 'react';

import { storageTitle, storageNumber } from './index.css';
export default function StorageTitle({number}){
  return (
    <div className={storageTitle}>
      门窗出货单
      <div className={storageNumber}>
        {number}
      </div>
    </div>
  )
}
