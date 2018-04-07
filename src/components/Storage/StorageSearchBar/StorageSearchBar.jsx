import React from 'react';
import { Form, DatePicker, Select, Input, Button } from 'antd';
import { formItemLayout } from '../../../constents/constents';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;


function StorageSearchBar({
  suppliers,
  onSearch,
  form: {
    getFieldDecorator,
    validateFields
  }
}) {

  function onClick() {
    validateFields((errors, values) => {
      if (!errors) {
        onSearch(values);
      }
    })
  }

  return (
    <Form layout="inline">
      <FormItem layout={formItemLayout}>
        {
          getFieldDecorator('timeRange')(
            <RangePicker size='large' />
          )
        }
      </FormItem>
      <FormItem layout={formItemLayout} label="供应商名称：">
        {
          getFieldDecorator('supplierId')(
            <Select style={{ width: 150 }}>
              {
                suppliers.map(({ _id, supplierName }) => (
                  <Option key={_id}>{supplierName}</Option>
                ))
              }
            </Select>
          )
        }
      </FormItem>
      <FormItem layout={formItemLayout} label="订单编号：">
        {
          getFieldDecorator('orderNumber')(
            <Input style={{ width: 150 }} />
          )
        }
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={onClick}>搜索</Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(StorageSearchBar);
