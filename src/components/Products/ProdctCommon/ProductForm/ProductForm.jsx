import React from 'react';
import { Form, Button, Upload, Icon, Input } from 'antd';
import { productForm, buttonGroup } from './index.css';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}

class ProductForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onUploadFiles = (e) => {
    console.log(e);
  }

  handleConfirm = () => {
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.onConfirm(values);
      }
    })
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    const { getFieldValue } = this.props.form;
    onCancel(getFieldValue('productImg'));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={productForm}>
        <Form>
          <h2>基础资料</h2>
          <FormItem label="商品编号：" { ...formItemLayout}>
            {
              getFieldDecorator('productCode')(
                <Input type="text" />
              )
            }
          </FormItem>
          <FormItem label="商品名称：" { ...formItemLayout}>
            {
              getFieldDecorator('productName', {
                rules: [
                  {
                    required: true,
                    message: '商品名称不能为空'
                  }
                ]
              })(
                <Input type="text" />
                )
            }
          </FormItem>
          <FormItem label="商品类别：" { ...formItemLayout}>
            {
              getFieldDecorator('productType', {
                rules: [
                  {
                    required: true,
                    message: '商品名称不能为空'
                  }
                ]
              })(
                <Input type="text" />
                )
            }
          </FormItem>
          <FormItem label="商品单位：" { ...formItemLayout}>
            {
              getFieldDecorator('productUnit', {
                rules: [
                  {
                    required: true,
                    message: '商品名称不能为空'
                  }
                ]
              })(
                <Input type="text" />
                )
            }
          </FormItem>
          <FormItem label="商品图片：" { ...formItemLayout}>
            {
              getFieldDecorator('productImg')(
                <Upload action="/api/upload"
                  listType="picture"
                  onChange={(e) => this.onUploadFiles(e)}
                >
                  <Button><Icon type="upload">上传</Icon></Button>
                </Upload>
              )
            }
          </FormItem>
        </Form>
        <div className={buttonGroup}>
          <Button type="primary" onClick={this.handleConfirm}>确定</Button>
          <Button onClick={this.handleCancel}>取消</Button>
        </div>
      </div>

    )
  }
}

export default Form.create()(ProductForm);
