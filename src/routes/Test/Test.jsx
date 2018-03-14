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

  constructor(props){
    super(props);
    this.state = {
      projectImage:''
    }
  }

  handleUpload = (e)=>{
    console.log(e);
  }

  render() {
    return (
      <div>
        <Upload name="files" action="/api/upload" listType="picture" onChange={(e) => this.handleUpload(e)}>
          <Button type="ghost">
            <Icon type="upload" />上传
          </Button>
        </Upload>

      </div>

    )
  }
}

export default Form.create()(Test);
