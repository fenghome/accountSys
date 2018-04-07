import React from 'react';
import { Upload, Button, Icon, Form, Input } from 'antd';
const FormItem = Form.Item;
import { formItemClass } from './index.css';
class Test extends React.Component {


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form>
        <FormItem label="姓名：" {...formItemLayout} >

            {
              getFieldDecorator('name')(
                <Input></Input>
              )
            }

        </FormItem>
        <FormItem label="单位名称" {...formItemLayout}>
          {
            getFieldDecorator('work')(
              <Input></Input>
            )
          }
        </FormItem>
      </Form>
    )
  }

}

export default Form.create()(Test);


