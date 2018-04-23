import React from 'react';
import { Upload, Button, Icon, Form, Input, Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import { formItemClass } from './index.css';
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ''
    }
  }

  a1() {
    this.setState({
      type: '1111'
    })
  }

  render() {

    return (
      <div>
        <Button onClick={console.log(this)}>点击我</Button>
        {this.state.type}
      </div>


    )
  }

}

export default Form.create()(Test);


