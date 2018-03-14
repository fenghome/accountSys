import React from 'react';
import { Form, Input } from 'antd';
import Title from '../../Title/Title';
import { addProduct } from './index.css';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol:{span:4},
  wrapperCol:{span:16}
}

function AddProduct({
  form: {
    getFieldDecorator,
    validateFields
  }
}) {
  return (
    <div>
      <Title title="商品信息" />
      <Form className={addProduct}>
        <h2>基础资料</h2>
        <FormItem label="商品编号：" { ...formItemLayout}>
          {
            getFieldDecorator('productCode')(
              <Input type="text"  />
            )
          }
        </FormItem>
        <FormItem label="商品名称：" { ...formItemLayout}>
          {
            getFieldDecorator('productName',{
              rules:[
                {
                  required:true,
                  message:'商品名称不能为空'
                }
              ]
            })(
              <Input type="text"  />
            )
          }
        </FormItem>
        <FormItem label="商品类别：" { ...formItemLayout}>
          {
            getFieldDecorator('productType',{
              rules:[
                {
                  required:true,
                  message:'商品名称不能为空'
                }
              ]
            })(
              <Input type="text"  />
            )
          }
        </FormItem>
        <FormItem label="商品单位：" { ...formItemLayout}>
          {
            getFieldDecorator('productUnit',{
              rules:[
                {
                  required:true,
                  message:'商品名称不能为空'
                }
              ]
            })(
              <Input type="text"  />
            )
          }
        </FormItem>
        <FormItem label="商品图片：" { ...formItemLayout}>
          {
            getFieldDecorator('productImg')(
              <Input type="text"  />
            )
          }
        </FormItem>
      </Form>
    </div>


  )
}

export default Form.create()(AddProduct);
