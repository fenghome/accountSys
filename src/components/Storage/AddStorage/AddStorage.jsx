import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import Storagetitle from '../StorageCommon/StorageTitle/StorageTitle'
import SuppliersForm from '../StorageCommon/SuppliersForm/SuppliersForm';
import StorageGrid from '../StorageCommon/StorageGrid/StorageGrid';
import RemarksForm from '../StorageCommon/RemarksForm/RemarksForm';
import { formClass, formItemClass, buttonGroup, btnOk, btnCanel } from './index.css';

function AddStorage({ dispatch, storage, form }) {

  const { suppliers, productList, storageSingle } = storage;
  const { noteNumber, products, msg } = storageSingle;
  const { getFieldDecorator, validateFields } = form;

  function saveStorage() {
    validateFields((errors, values) => {
      for (let item of products) {
        if (!item.productId || !item.quantity || !item.price) {
          dispatch({
            type: 'storage/setStorageSingleMsg',
            payload: '有填写不详细的商品条目'
          });
          return;
        }
      }
      const storageSingle = { ...storageSingle, products, ...values }
      if (!errors) {
        dispatch({
          type: 'storage/setStorageSingleMsg',
          payload: ''
        });
        dispatch({
          type: 'storage/saveStorage',
          payload: storageSingle
        })
      }
    })
  }

  return (
    <div>
      <Storagetitle title="门窗入库单" number={noteNumber} />
      <Form className={formClass} layout='horizontal' >
        <FormItem label="供应商名称" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} >
          {
            getFieldDecorator('supplierName', {
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
                    <Option key={index}>{item.supplierName}</Option>
                  ))
                }
              </Select>
              )
          }

        </FormItem>
        <FormItem>
          <StorageGrid />
          {
            <div style={{ color: "red" }}>{msg}</div>
          }
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
