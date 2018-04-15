import React from 'react';
import { Form, DatePicker, Select, Input, Button } from 'antd';
import { formItemLayout } from '../../../constents/constents';
import { connect } from 'dva';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;


function StorageSearchBar({
  dispatch,
  storage:{suppliers},
  form: {getFieldDecorator,validateFields}
}) {

  function onClick() {
    validateFields((errors, values) => {
      if (!errors) {
        if(values.timeRange){
          values.timeRange = values.timeRange.map((item)=>{
            return item.toLocaleString();
          })
        }
      }
      dispatch({
        type:'storage/getList',
        payload:values
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
          getFieldDecorator('noteNumber')(
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

function mapStateToProps(state) {
  return { storage: state.storage };
}

export default connect(mapStateToProps)(Form.create()(StorageSearchBar));
