import React from 'react';
import { connect } from 'dva';
import { Form, Button, Select, Input, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import OrderTitle from '../OrderCommon/OrderTitle/OrderTitle';
import CustomersForm from '../OrderCommon/CustomersForm/CustomersForm';
import OrderGrid from '../OrderCommon/OrderGrid/OrderGrid';
import RemarksForm from '../OrderCommon/RemarksForm/RemarksForm';
import { buttonGroup, btnOk, btnCanel } from './index.css';

function AddOrder({ dispatch, orders, form }) {
  const { pageType, customers, productList, order } = orders;
  const { orderNumber, customerId, products } = order;
  const { getFieldDecorator, validateFields } = form;
  const disabled = pageType == 'details' ? true : false;

  function selectProduct(productId) {

  }

  function saveOrder() {
    validateFields((errors, values) => {
      if (!errors) {
        const { customerId, mem } = values;
        const { customerName = '' } = customers.find((item) => {
          return item._id == customerId
        });
        dispatch({
          type: 'orders/updateOrderCustomer',
          payload: { customerId, customerName }
        });
        dispatch({
          type: 'orders/updateOrderMem',
          payload: mem
        });

        //判断products是否有空数据
        let validateProducts = true;
        for (let item of products) {
          if (!item.productId || !item.quantity || !item.price) {
            validateProducts = false;
            message.info('出货单条目信息不全')
            break;
          }
        }
        if (validateProducts) {
          if (pageType == 'add') {
            dispatch({
              type: 'orders/saveOrder'
            })
          } else if (pageType == 'modify') {
            dispatch({
              type: 'orders/updateOrder'
            })
          }
        };
      }
    })
  }

  function clickCanel() {
    dispatch({
      type: 'orders/setDefaultState'
    })
  }

  return (

    <div>
      <OrderTitle title="门窗出货单" number={orderNumber} />
      <Form>
        <FormItem label="客户名称：" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
          {
            getFieldDecorator('customerId', {
              initialValue: customerId,
              rules: [{
                required: true,
                message: '客户不能为空'
              }]
            })(
              <Select disabled={disabled}>
                {
                  customers.map((item, index) => (
                    <Option key={index} value={item._id}>{item.customerName}</Option>
                  ))
                }
              </Select>
              )
          }
        </FormItem>
        <FormItem>
          <OrderGrid />
        </FormItem>
        <FormItem label="填写备注" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
          {
            getFieldDecorator('mem')(
              <TextArea
                rows={4}
                disabled={disabled}
                placeholder="在此处填写备注..."
              />
            )
          }
        </FormItem>
      </Form>
      <div className={buttonGroup}>
        {disabled || <Button type="primary" className={btnOk} onClick={saveOrder}>确定</Button>}
        <Button className={btnCanel} onClick={clickCanel}>取消</Button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return { orders: state.orders }
}

export default connect(mapStateToProps)(Form.create()(AddOrder))
