import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

import { formItemLayout } from '../../constents/constents';
import { errClass } from './index.css';
const FormItem = Form.Item;

class LogupModal extends React.Component {

  componentWillReceiveProps(nextState){
    if(!nextState.visible){
      this.props.form.resetFields();
    }
  }

  onOk = () => {
    const { onConfirm } = this.props;
    const { validateFields } = this.props.form;
    validateFields((errors, values) => {
      if (!errors) {
        onConfirm(values);
      }
    })
  }
  onCancel = () => {
    const { onCancel } = this.props;
    const { resetFields } = this.props.form;
    onCancel();
  }

  checkRePassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('密码不一致');
    }
    callback();
  }

  render() {
    const { visible, errMsg, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title="注册"
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
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
          <FormItem label="重复密码：" {...formItemLayout}>
            {
              getFieldDecorator('rePassword', {
                rules: [
                  {
                    required: true,
                    message: '重复密码不能为空'
                  }, {
                    validator: this.checkRePassword
                  }
                ]
              })(
                <Input type="password" />
                )
            }
          </FormItem>
          <div className={errClass}>{errMsg}</div>
        </Form>
      </Modal>
    )
  }

}
export default Form.create()(LogupModal);
