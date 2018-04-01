import React from 'react';
import { Upload, Button, Icon, Form } from 'antd';
const FormItem = Form.Item;

class Test extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fileList:[]
    }
  }

  onChange = (info) => {
    console.log(info);
  }

  normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <h2>上传文件</h2>
        <FormItem>
          {
            getFieldDecorator('file',{
              valuePropName: 'fileList',
							getValueFromEvent: this.normFile
            })(
              <Upload
                action='/api/upload'
                onChange={this.onChange}
              >
                <Button>
                  <Icon type="upload" />Click
                </Button>
              </Upload>
            )
          }

        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(Test);


