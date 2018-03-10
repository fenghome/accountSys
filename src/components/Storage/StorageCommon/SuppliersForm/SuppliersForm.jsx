import React from 'react';
import { Form, Select } from 'antd';
import { suppilersForm } from './index.css';
import { formItemLayout } from '../../../../constents/constents';
const FormItem = Form.Item;
const Option = Select.Option;

function SuppilersForm({
  suppliers,
  selectSupplierName,
  disabled=false,
  form:{
    getFieldDecorator
  }
}){
  return (
      <Form layout="inline" className={suppilersForm}>
        <FormItem label="供应商名称：" {...formItemLayout}>
          {
            getFieldDecorator('customerId',{
              initialValue: selectSupplierName,
              rules:[
                {
                  required:true,
                  message:'必须选择供应商名称'
                }
              ]
            })(
              <Select style={{width:340}} disabled={disabled}>
                {
                  suppliers.map((item,index)=>(
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

export default Form.create()(SuppilersForm);
