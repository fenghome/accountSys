import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import Storagetitle from '../StorageCommon/StorageTitle/StorageTitle'
import SuppliersForm from '../StorageCommon/SuppliersForm/SuppliersForm';
import StorageGrid from '../StorageCommon/StorageGrid/StorageGrid';
import RemarksForm from '../StorageCommon/RemarksForm/RemarksForm';
import { formClass, formItemClass, buttonGroup, btnOk, btnCanel } from './index.css';

function AddStorage({ dispatch, storage, form }) {

  let { suppliers, productList, storageSingle } = storage;
  const { noteNumber, products,paymentAmount } = storageSingle;
  const { getFieldDecorator, validateFields } = form;
  

  function saveStorage() { 
    
    validateFields((errors, values) => {
      for (let item of products) {
        if (!item.productId || !item.quantity || !item.price) {
          message.info('产品条目内容不全')
          return;
        }
      }

      if(paymentAmount==0){
        message.info('支付金额不能为零');
        return;
      }
      const { supplierId,mem } = values;
      
      const supplier = suppliers.find((item)=>{
        return item._id == supplierId;
      })
      
      let newStorageSingle = { 
        ...storageSingle, 
        products, 
        supplierId:supplier._id,
        supplierName:supplier.supplierName,
        mem
      }
      
      if (!errors) {
        dispatch({
          type: 'storage/saveStorage',
          payload: newStorageSingle
        }); 
      }
    })
  }

  return (
    <div>
      <Storagetitle title="门窗入库单" number={noteNumber} />
      <Form className={formClass} layout='horizontal' >
        <FormItem label="供应商名称" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} >
          {
            getFieldDecorator('supplierId', {
              rules: [
                {
                  required: true,
                  message: '供应商不能为空'
                }
              ]
            })(
              <Select>
                {
                  suppliers.map((item, index) => (
                    <Option key={index} value={item._id}>{item.supplierName}</Option>
                  ))
                }
              </Select>
              )
          }

        </FormItem>
        <FormItem>
          <StorageGrid />
        </FormItem>

        <FormItem label="备注信息" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }} >
          {
            getFieldDecorator('mem')(
              <TextArea
                rows={4}
                placeholder="在此处填写备注..."
              />
            )
          }
        </FormItem>

        <div className={buttonGroup}>
          <Button type="primary" className={btnOk} onClick={saveStorage}>确定</Button>
          <Button className={btnCanel}>取消</Button>
        </div>
      </Form>
    </div>
  )
}

function mapStateToProps(state) {
  return { storage: state.storage }
}

export default connect(mapStateToProps)(Form.create()(AddStorage));
