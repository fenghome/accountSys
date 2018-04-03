import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
import { supplierForm, formClass, buttonGroup } from './index.css';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}

function SupplierForm({dispatch,suppliers,form})
 {
  const {pageType,currentSupplier} = suppliers;
  const {getFieldDecorator,validateFields} = form;
  const disabled = pageType==='details' ? true : false
  const {
   
    supplierName = '',
    contactPeople = '',
    contactPhone = '',
    address = '',
    mem = '',
    accountName = '',
    accountBank = '',
    accountNo = '',
  } = currentSupplier

  function saveSupplier() {
    validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type:'suppliers/saveSupplier',
          payload:values
        });
      }
    })
  }

  function updateSupplier(){
    validateFields((errors,values)=>{
      if(!errors){
        dispatch({
          type:'suppliers/updateSupplier',
          payload:values
        });
      }
    })
  }

  function handlerCancle() {
    dispatch({
      type:'suppliers/initState'
    })
  }

  return (
    <div>
      <div className={supplierForm}>
        <Form className={formClass}>
          <h2>基础资料</h2>
          <FormItem label="供应商名称：" {...formItemLayout}>
            {
              getFieldDecorator('supplierName', {
                initialValue: supplierName,
                rules: [
                  {
                    required: true,
                    message: '供应商名称不能为空'
                  }
                ]
              })(
                <Input type="text" disabled={disabled} />
                )
            }
          </FormItem>
          <FormItem label="联系人：" {...formItemLayout}>
            {
              getFieldDecorator('contactPeople', {
                initialValue: contactPeople,
                rules: [
                  {
                    required: true,
                    message: '联系人不能为空'
                  }
                ]
              })(
                <Input type="text" disabled={disabled} />
                )
            }
          </FormItem>
          <FormItem label="联系方式：" {...formItemLayout}>
            {
              getFieldDecorator('contactPhone', {
                initialValue: contactPhone,
                rules: [
                  {
                    required: true,
                    message: '联系方式不能为空'
                  }
                ]
              })(
                <Input type="text" disabled={disabled} />
                )
            }
          </FormItem>
          <FormItem label="地址：" {...formItemLayout}>
            {
              getFieldDecorator('address', {
                initialValue: address,
                rules: [
                  {
                    required: true,
                    message: '地址不能为空'
                  }
                ]
              })(
                <Input type="text" disabled={disabled} />
                )
            }
          </FormItem>
          <FormItem label="备注：" {...formItemLayout}>
            {
              getFieldDecorator('mem', {
                initialValue: mem,
              })(
                <TextArea rows={4} disabled={disabled} />
                )
            }
          </FormItem>
        </Form>

        <Form className={formClass}>
          <h2>财务信息</h2>
          <FormItem label="开户名称：" {...formItemLayout}>
            {
              getFieldDecorator('accountName', {
                initialValue: accountName,
              })(
                <Input type="text" disabled={disabled} />
                )
            }
          </FormItem>
          <FormItem label="开户银行：" {...formItemLayout}>
            {
              getFieldDecorator('accountBank', {
                initialValue: accountBank,
              })(
                <Input type="text" disabled={disabled} />
                )
            }
          </FormItem>
          <FormItem label="银行账号：" {...formItemLayout}>
            {
              getFieldDecorator('accountNo', {
                initialValue: accountNo,
              })(
                <Input type="text" disabled={disabled} />
                )
            }
          </FormItem>
        </Form>

      </div>
      <div className={buttonGroup}>
        {
          disabled || 
          <Button type="primary" 
            onClick={pageType === 'add' ? saveSupplier : updateSupplier}>
            确定
          </Button>
        }
        <Button onClick={handlerCancle}>取消</Button>
      </div>
    </div>

  )
}

function mapStateToProps(state){
  return { suppliers:state.suppliers }
}

export default connect(mapStateToProps)(Form.create()(SupplierForm))
