import React from 'react';
import { Form, Input } from 'antd';
import {productForm, formColumn, formTitle} from './index.css';

const FormItem = Form.Item;

const formItemLayout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 20
	}
};

class Test extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={productForm}>
        <Form>
          <span className={formColumn}>
            <h2 className='formTitle'>基础资料</h2>
            <FormItem label="商品编号："  {...formItemLayout}>
              {
                getFieldDecorator('productCode', {
                  initialValue: 'productCode'
                })(
                  <Input type='text' />
                  )
              }
            </FormItem>
            <FormItem label="商品名称：" {...formItemLayout}>
              {
                getFieldDecorator('productName', {
                  initialValue: 'productName',
                  rules: [
                    { required: true, message: '商品名称不能为空' }
                  ]
                })(
                  <Input type='text' />
                  )
              }
            </FormItem>
            <FormItem label="商品类别："  {...formItemLayout}>
              {
                getFieldDecorator('productType', {
                  initialValue: 'productType',
                  rules: [
                    { required: true, message: '商品类别不能为空' }
                  ]
                })(
                  <Input type='text'  />
                  )
              }
            </FormItem>
            <FormItem label="商品单位：" {...formItemLayout}>
              {
                getFieldDecorator('productUnit', {
                  initialValue: 'productUnit',
                  rules: [
                    { required: true, message: '商品单位不能为空' }
                  ]
                })(
                  <Input type='text'  />
                  )
              }
            </FormItem>
          </span>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Test);
