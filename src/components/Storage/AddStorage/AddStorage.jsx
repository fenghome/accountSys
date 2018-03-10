import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Storagetitle from '../StorageCommon/StorageTitle/StorageTitle'
import SuppliersForm from '../StorageCommon/SuppliersForm/SuppliersForm';
import StorageGrid from '../StorageCommon/StorageGrid/StorageGrid';
import RemarksForm from '../StorageCommon/RemarksForm/RemarksForm';
import { buttonGroup,btnOk, btnCanel } from './index.css';

function AddStorage({dispatch, storage}) {
  const { suppliers, productList, storageSingle} = storage;
  const { noteNumber } = storageSingle;

  function selectProduct(productId) {

  }

  function updateStorage(storageSingle) {
    dispatch({
      type: 'storage/updateStorageSingle',
      payload: order
    })
  }

  function changeStorageSingleMem(mem){
    dispatch({
      type:'storage/changeStorageSingleMem',
      payload:mem
    })
  }

  return (
    <div>
      <Storagetitle title="门窗入库单" number={noteNumber} />
      <SuppliersForm suppliers={suppliers} />
      <StorageGrid productList={productList} order={order} updateOrder={updateOrder}/>
      <RemarksForm changeOrderMem={changeOrderMem}/>
      <div className={buttonGroup}>
        <Button type="primary" className={btnOk}>确定</Button>
        <Button className={btnCanel}>取消</Button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return { storage: state.storage }
}

export default connect(mapStateToProps)(AddStorage)
