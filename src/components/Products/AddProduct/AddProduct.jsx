import React from 'react';
import { Form } from 'antd';
import Title from '../../Title/Title';
const FormItem = Form.Item;

function AddProduct(){
    return (
        <div>
            <Title title="商品信息"/>
            <Form>
                <FormItem>
                    <Label>基础资料</Label>
                </FormItem>
                <FormItem>
                    
                </FormItem>
            </Form>
        </div>
    )
}

export default Form.create()(AddProduct);