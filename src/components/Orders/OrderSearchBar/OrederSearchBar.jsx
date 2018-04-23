import React from 'react';
import { connect } from 'dva';
import { Form, DatePicker, Select, Input, Button } from 'antd';
import { formItemLayout } from '../../../constents/constents';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;


function OrderSearchBar({ dispatch, orders, form }) {
  const { customers } = orders;
  const { getFieldDecorator, validateFields } = form;

  function onSearch() {
    validateFields((errors, values) => {
      if (!errors) {
        if (values.timeRange) {
          values.timeRange = values.timeRange.map((item) => {
            return item.toLocaleString();
          })
        }
      };
      dispatch({
        type: 'orders/getOrders',
        payload: values
      })
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
      <FormItem layout={formItemLayout} label="客户名称：">
        {
          getFieldDecorator('customerId')(
            <Select style={{ width: 150 }}>
              {
                customers.map(({ _id, customerName }) => (
                  <Option key={_id}>{customerName}</Option>
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
        <Button type="primary" onClick={onSearch}>搜索</Button>
      </FormItem>
    </Form>
  )
}

function mapStateToProps(state) {
  return { orders: state.orders }
}

export default connect(mapStateToProps)(Form.create()(OrderSearchBar));
