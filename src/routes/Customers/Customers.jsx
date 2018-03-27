import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import SearchForm from '../../components/SearchForm/SearchForm';
import CustomerList from '../../components/Customers/CustomerList/CustomerList';
import Title from '../../components/Title/Title';
import CustomerForm from '../../components/Customers/CustomerForm/CustomerForm';
import { customersContainer, customersBar } from './index.css';

class Customers extends Component {

  componentWillReceiveProps(nextProps){
    const { dispatch, customers} = nextProps;
    if(customers.msg){
      message.info(customers.msg);
      dispatch({
        type:'customers/setMessage',
        payload:''
      })
    }
  }

  onSearch = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type:'customers/setSearchCustomerName',
      payload:value.customerName
    });
    dispatch({
      type:'customers/getCustomers'
    })
  }

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customers/changeToAddPage'
    });
  }

  onModify = (currentCustomer) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customers/changeToModifyPage',
      payload: currentCustomer
    })
  }

  onDetails = (currentCustomer) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customers/changeToDetailsPage',
      payload: currentCustomer
    })
  }

  onDelete = (customerId)=>{
    const { dispatch } = this.props;
    dispatch({
      type:'customers/deleteCustomer',
      payload:customerId
    })
  }

  saveCustomer = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customers/saveCustomer',
      payload: values
    });
  }

  updateCustomer = (values)=>{
    const { dispatch } = this.props;
    dispatch({
      type:'customers/updateCustomer',
      payload:values
    })
  }

  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customers/initCustomers'
    });
  }

  onPageChange = (page) =>{
    const { dispatch } = this.props;
    dispatch({
      type:'customers/setCurrentPage',
      payload:{
        currentPage:page
      }
    });
    dispatch({
      type:'customers/getCustomers'
    })
  }

  render() {
    const { pageType, breadcrumbItems, customers, currentCustomer, msg,total,currentPage } = this.props.customers;
    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        {
          pageType === 'show' &&
          <div className={customersContainer}>
            <div className={customersBar}>
              <SearchForm label="客户名称：" fieldName="customerName" onSearch={value => this.onSearch(value)} />
              <Button type="primary" onClick={this.onAdd}>添加</Button>
            </div>
            <CustomerList
             customers={customers}
             onModify={this.onModify}
             onDetails={this.onDetails}
             onDelete={this.onDelete}
             onPageChange={this.onPageChange}
             total={total}
             currentPage={currentPage}
            />
          </div>
        }
        {
          pageType === 'add' &&
          <div className={customersContainer}>
            <Title title="客户资料" />
            <CustomerForm onConfirm={this.saveCustomer} onCancel={this.onCancel} />
          </div>
        }
        {
          pageType === 'modify' &&
          <div className={customersContainer}>
            <Title title="客户资料" />
            <CustomerForm customer={currentCustomer} onConfirm={this.updateCustomer} onCancel={this.onCancel} />
          </div>
        }
        {
          pageType === 'details' &&
          <div className={customersContainer}>
            <Title title="客户资料" />
            <CustomerForm customer={currentCustomer} onConfirm={this.saveCustomer} onCancel={this.onCancel} disabled={true} />
          </div>
        }

      </div>

    )
  }
}

function mapStateToProps(state) {
  return { customers: state.customers };
}
export default connect(mapStateToProps)(Customers);
