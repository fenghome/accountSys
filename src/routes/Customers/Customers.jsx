import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import SearchForm from '../../components/SearchForm/SearchForm';
import CustomerList from '../../components/Customers/CustomerList/CustomerList';
import Title from '../../components/Title/Title';
import CustomerForm from '../../components/Customers/CustomerForm/CustomerForm';
import { customersContainer, customersBar } from './index.css';

class Customers extends Component {

  onSearch = (value) => {
    console.log(value);
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

  saveCustomer = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customers/saveCustomer',
      payload: values
    });
  }

  onCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customers/initCustomers'
    });
  }

  render() {
    const { pageType, breadcrumbItems, customers, currentCustomer } = this.props.customers;
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
            <CustomerList customers={customers} onModify={this.onModify} onDetails={this.onDetails} />
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
            <CustomerForm customer={currentCustomer} onConfirm={this.saveCustomer} onCancel={this.onCancel} />
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
