import React from 'react';
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item;
function SearchForm(
  {
    label,
    fieldName,
    onSearch,
    form: {
      getFieldDecorator,
      validateFields
    }
  }
) {

  function onClick() {
    validateFields((errors, value) => {
      if (!errors) {
        onSearch(value);
      }
    })
  }

  return (
    <Form layout="inline">
      <FormItem label={label}>
        {
          getFieldDecorator(fieldName)(
            <Input style={{ width: 150 }} type="text" />
          )
        }
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={onClick}>搜索</Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(SearchForm);
