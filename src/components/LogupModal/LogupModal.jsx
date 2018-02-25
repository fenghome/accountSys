import React from 'react';
import {Modal,Form,Input,Button} from 'antd';

import {formItemLayout} from '../../constents/constents';
const FormItem = Form.Item;

function LogupModal({
  visible,
  onConfirm,
  onCancel,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldValue
  }
}){

  function onOk(){
    validateFields((errors,values)=>{
      if(!errors){
        onConfirm(values);
      }
    })
  }

  function checkRePassword(rule, value, callback){
    if(value && value !== getFieldValue('password')){
      callback('密码不一致');
    }
    callback();
  }

  return (
    <Modal
      title="注册"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <FormItem label="用户名：" {...formItemLayout}>
          {
            getFieldDecorator('username',{
              rules:[
                {
                  required:true,
                  message:'用户名不能为空'
                }
              ]
            })(
              <Input />
            )
          }
        </FormItem>
        <FormItem label="密码：" {...formItemLayout}>
          {
            getFieldDecorator('password',{
              rules:[
                {
                  required:true,
                  message:'密码不能为空'
                }
              ]
            })(
              <Input type="password" />
            )
          }
        </FormItem>
        <FormItem label="重复密码：" {...formItemLayout}>
          {
            getFieldDecorator('rePassword',{
              rules:[
                {
                  required:true,
                  message:'重复密码不能为空'
                },{
                  validator:checkRePassword
                }
              ]
            })(
              <Input type="password" />
            )
          }
        </FormItem>
      </Form>
    </Modal>
  )
}
export default Form.create()(LogupModal);
