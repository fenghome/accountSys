import React from 'react';
import { connect } from 'dva';
import { Form,Button,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import OrderTitle from '../OrderCommon/OrderTitle/OrderTitle';
import CustomersForm from '../OrderCommon/CustomersForm/CustomersForm';
import OrderGrid from '../OrderCommon/OrderGrid/OrderGrid';
import RemarksForm from '../OrderCommon/RemarksForm/RemarksForm';
import { buttonGroup,btnOk, btnCanel } from './index.css';

function AddOrder({dispatch, orders,form}) {
  const { customers, productList, order} = orders;
  const { orderNumber,customerId } = order;
  const { getFieldDecorator } = form;

  function selectProduct(productId) {

  }

  function updateOrder(order) {
    dispatch({
      type: 'orders/updateOrder',
      payload: order
    })
  }

  function changeOrderMem(mem){
    dispatch({
      type:'orders/changeOrderMem',
      payload:mem
    })
  }

  function clickCanel(){
    dispatch({
      type:'orders/setDefaultState'
    })
  }

  return (
    
    <div>
      <OrderTitle title="门窗出货单" number={orderNumber} />
 
      <Form>
        <FormItem label="客户名称：" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
          {
            getFieldDecorator('customerId',{
              initalValue:customerId,
              rules:[{
                require:true,
                message:'客户不能为空'
              }]
            })(
              <Select>
                {
                  customers.map((item,index)=>(
                    <Option key={index} value={item._id}>{item.customerName}</Option>
                  ))
                }
              </Select>
            )
          }
        </FormItem>
        <FormItem>
        <OrderGrid productList={productList} order={order} updateOrder={updateOrder}/>
        </FormItem>
        <FormItem>
        <RemarksForm changeOrderMem={changeOrderMem}/>
        </FormItem>
      </Form>
      

      <div className={buttonGroup}>
        <Button type="primary" className={btnOk}>确定</Button>
        <Button className={btnCanel} onClick={clickCanel}>取消</Button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return { orders: state.orders }
}

export default connect(mapStateToProps)(Form.create()(AddOrder))
