import React from 'react';
import { Select,Form } from 'antd';
import { connect } from 'dva';
import { suppilersForm } from './index.css';
import { formItemLayout } from '../../../../constents/constents';
const FormItem = Form.Item;
const Option = Select.Option;

function SuppilersForm({ dispatch, storage, form }) {
  const { suppliers={} } = storage;
  const { supplierName=''} = suppliers;
  const { getFieldDecorator } = form;
  return (
    <Form layout="inline" className={suppilersForm}>
      <FormItem label="供应商名称：" {...formItemLayout}>
        {
          getFieldDecorator('customerId', {
            initialValue: supplierName,
            rules: [
              {
                required: true,
                message: '必须选择供应商名称'
              }
            ]
          })(
            <Select style={{ width: 340 }} disabled={disabled}>
              {
                suppliers.map((item, index) => (
                  <Option key={index} vaule={item['_id']}>{item.supplierName}</Option>
                ))
              }
            </Select>
            )
        }
      </FormItem>
    </Form>

  )
}

function mapStateToProps(state) {
  return { storage: state.storage }
}

export default connect(mapStateToProps)(SuppilersForm);
