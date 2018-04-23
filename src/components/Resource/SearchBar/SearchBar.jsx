import React from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function SearchBar({ dispatch, resource, form }) {
  const { products } = resource;
  const { getFieldDecorator, validateFields } = form;

  function onSearch() {
    validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'resource/query',
          payload: values
        })
      }
    })
  }

  return (
    <Form layout="inline">
      <FormItem label="商品名称">
        {
          getFieldDecorator('productId')(
            <Select style={{ width: 150 }}>
              {
                products.map((item, index) => (
                  <Option key={item._id} value={item._id}>{item.productName}</Option>
                ))
              }
            </Select>
          )
        }
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={onSearch}>搜索</Button>
      </FormItem>
    </Form>
  )
}

function mapStateToProps(state) {
  return { resource: state.resource }
}

export default connect(mapStateToProps)(Form.create()(SearchBar));
