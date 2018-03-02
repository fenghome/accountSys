import React from 'react';
import { Form, Select } from 'antd';
import { customersForm } from './index.css';
import { formItemLayout } from '../../../../constents/constents';
const FormItem = Form.Item;
const Option = Select.Option;

function CustomersForm({
  customers,
  form:{
    getFieldDecorator
  }
}){
  return (
      <Form layout="inline" className={customersForm}>
        <FormItem label="客户名称：" {...formItemLayout}>
          {
            getFieldDecorator('customerId',{
              rules:[
                {
                  required:true,
                  message:'必须选择客户名称'
                }
              ]
            })(
              <Select style={{width:340}}>
                {
                  customers.map((item,index)=>(
                    <Option key={index} vaule={item.id}>{item.customerName}</Option>
                  ))
                }
              </Select>
            )
          }
        </FormItem>
      </Form>

  )
}

export default Form.create()(CustomersForm);
