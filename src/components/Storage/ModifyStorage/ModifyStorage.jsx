import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import StorageTitle from '../StorageCommon/StorageTitle/StorageTitle'
import SuppilersForm from '../StorageCommon/SuppliersForm/SuppliersForm';
import StorageGrid from '../StorageCommon/StorageGrid/StorageGrid';
import RemarksForm from '../StorageCommon/RemarksForm/RemarksForm';
import { buttonGroup,btnOk, btnCanel } from './index.css';

function ModifyStorage({ dispatch, storage, disabled = false }) {
  const { suppliers, productList, storageSingle } = storage;
  const { noteNumber, supplierName } = storageSingle;

  function selectProduct(productId) {

  }

  function updateStorageSingle(storageSingle) {
    dispatch({
      type: 'storage/updateStorageSingle',
      payload: storageSingle
    })
  }

  function changeStorageSingleMem(mem) {
    dispatch({
      type: 'storage/changeStorageSingleMem',
      payload: mem
    })
  }

  return (
    <div>
      <StorageTitle title="门窗出货单" number={noteNumber} />

      <SuppilersForm
        suppliers={suppliers}
        selectSupplierName={supplierName}
        disabled={disabled} />

      <StorageGrid
        productList={productList}
        storageSingle={storageSingle}
        updateStorageSingle={updateStorageSingle}
        disabled={disabled} />

      <RemarksForm
        defaultValue={storageSingle.mem}
        changeStorageSingleMem={changeStorageSingleMem}
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
  return {storage: state.storage }
}

export default connect(mapStateToProps)(ModifyStorage)
