import React from 'react';
import { Form, Input, Upload, Button, Icon } from 'antd';
import { productForm, formColumn, formTitle } from './index.css';

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

  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    }
  }

  handleUpload = (e) => {

    console.log(e);
  }


  onClick = ()=>{
    const { validateFields } = this.props.form;
    validateFields((errors,values)=>{
      console.log(values);
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
          <FormItem>
            {
              getFieldDecorator('files')(
                <Upload action="/upload"
                  listType="picture"
                  fileList={this.state.fileList}

                >
                  <Button type="ghost">
                    <Icon type="upload" />上传
                  </Button>
                </Upload>
              )
            }
          </FormItem>
          <Button onClick={this.onClick}>确定</Button>
        </Form>


      </div>


    )
  }
}

export default Form.create()(Test);
