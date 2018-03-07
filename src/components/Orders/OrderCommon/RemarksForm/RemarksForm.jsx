import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
import { remarksForm } from './index.css';

export default function ({changeOrderMem}) {
  return (
    <div className={remarksForm}>
      填写备注：
      <TextArea
        style={{ width: 500 }}
        rows={4}
        placeholder="在此处填写备注..."
        onBlur = {(e)=>{changeOrderMem(e.target.value)}}
      />
    </div>
  )
}
