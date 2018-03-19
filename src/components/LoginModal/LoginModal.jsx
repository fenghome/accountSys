import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

import { formItemLayout } from '../../constents/constents';
import { errClass } from './index.css';
const FormItem = Form.Item;

function LoginModal({
  visible,
  errMsg,
  onConfirm,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldValue
  }
}) {

  function onOk() {
    validateFields((errors, values) => {
      if (!errors) {
        onConfirm(values);
      }
    })
  }

  return (
    <Modal
      title="登录"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <FormItem label="用户名：" {...formItemLayout}>
          {
            getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '用户名不能为空'
                }
              ]
            })(
              <Input />
              )
          }
        </FormItem>
        <FormItem label="密码：" {...formItemLayout}>
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                }
              ]
            })(
              <Input type="password" />
              )
          }
        </FormItem>
      </Form>
      <div className={errClass}>{errMsg}</div>
    </Modal>
  )
}
export default Form.create()(LoginModal);
