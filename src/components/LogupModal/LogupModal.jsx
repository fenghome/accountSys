import React from 'react';
import {Modal,Form,Input,Button} from 'antd';

const FormItem = Form.Item;

function LogupModal({
  visible,
  onOk,
  onCancle,
  form:getFieldDecorator
}){
  return (
    <Modal
      title="注册"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form>
        <FormItem>
          {
            getFieldDecorator('username',{
              rules:[
                {
                  required:true,
                  message:'用户名不能为空！'
                }
              ]
            })(
              <Input />
            )
          }
        </FormItem>
      </Form>
    </Modal>
  )
}
export default Form.create()(LogupModal);
