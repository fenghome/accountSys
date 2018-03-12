import React from 'react';
import { Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function SearchBar({
  label,
  list,
  onSearch,
  form: {
    getFieldDecorator,
    validateFields
  }
 }) {

  function onClick(){
    validateFields((errors,values)=>{
      if(!errors){
        onSearch(values);

      }
    })
  }

  return (
    <Form layout="inline">
      <FormItem label={label}>
        {
          getFieldDecorator('productId')(
            <Select style={{width:150}}>
              {
                list.map((item, index) => (
                  <Option key={index} value={item.productId}>{item.productName}</Option>
                ))
              }
            </Select>
          )
        }
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={onClick}>搜索</Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(SearchBar);
