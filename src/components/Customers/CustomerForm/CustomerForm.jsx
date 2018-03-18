import React from 'react';
import { Form, Input, Button } from 'antd';
import { customerForm, formClass, buttonGroup } from './index.css';
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}

function CustomerForm(
  {
    customer = {},
    disabled = false,
    onConfirm,
    onCancel,
    form: {
      getFieldDecorator,
      validateFields
    }
  }
) {
  const {
    customerName = '',
    contactPeople = '',
    contactPhone = '',
    address = '',
    mem = '',
    accountName = '',
    accountBank = '',
    accountNo = '',
  } = customer;

  function handlerConfirm() {
    validateFields((errors, values) => {
      if (!errors) {
        onConfirm(values);
      }
    })
  }

  function handlerCancel() {
    onCancel();
  }

  return (
    <div>
      <div className={customerForm}>
        <Form className={formClass}>
          <h2>基础资料</h2>
          <FormItem label="客户名称：" {...formItemLayout}>{
            getFieldDecorator('customerName', {
              initialValue: customerName,
              rules: [
                {
                  required: true,
                  message: '客户名称不能为空'
                }
              ]
            })(
              <Input type="text" disabled={disabled}/>
              )
          }
          </FormItem>
          <FormItem label="联系人：" {...formItemLayout}>{
            getFieldDecorator('contactPeople', {
              initialValue: contactPeople,
              rules: [
                {
                  required: true,
                  message: '联系人称不能为空'
                }
              ]
            })(
              <Input type="text" disabled={disabled}/>
              )
          }
          </FormItem>
          <FormItem label="联系方式：" {...formItemLayout}>{
            getFieldDecorator('contactPhone', {
              initialValue: contactPhone,
              rules: [
                {
                  required: true,
                  message: '联系方式不能为空'
                }
              ]
            })(
              <Input type="text" disabled={disabled}/>
              )
          }
          </FormItem>
          <FormItem label="地址：" {...formItemLayout}>{
            getFieldDecorator('address', {
              initialValue: address,
              rules: [
                {
                  required: true,
                  message: '地址不能为空'
                }
              ]
            })(
              <Input type="text" disabled={disabled}/>
              )
          }
          </FormItem>
          <FormItem label="备注：" {...formItemLayout}>{
            getFieldDecorator('mem', {
              initialValue: mem,
            })(
              <TextArea rows={4} disabled={disabled}/>
              )
          }
          </FormItem>
        </Form>
        <Form className={formClass}>
          <h2>财务信息</h2>
          <FormItem label="开户名称：" {...formItemLayout}>{
            getFieldDecorator('accountName', {
              initialValue: accountName,
            })(
              <Input type="text" disabled={disabled}/>
              )
          }
          </FormItem>
          <FormItem label="开户银行：" {...formItemLayout}>{
            getFieldDecorator('accountBank', {
              initialValue: accountBank,
            })(
              <Input type="text" disabled={disabled}/>
              )
          }
          </FormItem>
          <FormItem label="开户账号：" {...formItemLayout}>{
            getFieldDecorator('accountNo', {
              initialValue: accountNo,
            })(
              <Input type="text" disabled={disabled}/>
              )
          }
          </FormItem>
        </Form>

      </div>
      <div className={buttonGroup}>
        {
          disabled || <Button type="primary" onClick={handlerConfirm}>确定</Button>
        }
        <Button onClick={handlerCancel}>取消</Button>
      </div>
    </div>
  )

}

export default Form.create()(CustomerForm);
