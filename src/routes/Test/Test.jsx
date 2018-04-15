import React from 'react';
import { Upload, Button, Icon, Form, Input,Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import { formItemClass } from './index.css';
class Test extends React.Component {


  render() {

    return (
      <Select defaultValue="2" style={{width:200}}>
        <Option value="1">aaaa</Option>
        <Option value="2">bbbb</Option>
      </Select>
    )
  }

}

export default Form.create()(Test);


