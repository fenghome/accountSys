import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import SearchForm from '../../components/SearchForm/SearchForm';
import SupplierList from '../../components/Suppliers/SupplierList/SupplierList';
import Title from '../../components/Title/Title';
import SupplierForm from '../../components/Suppliers/SupplierForm/SupplierForm';
import { suppliersBar } from './index.css';

class Suppliers extends Component {

  onSearch = (value) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'suppliers/setSearchSupplierName',
      payload: value.supplierName
    });
    dispatch({
      type:'suppliers/getSuppliers'
    })
  }

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'suppliers/changToAddPage'
    })
  }

  render() {
    const { pageType, breadcrumbItems, suppliers, currentSupplier } = this.props.suppliers;
    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        {
          pageType === 'show' &&
          <div>
            <div className={suppliersBar}>
              <SearchForm label="供应商名称：" fieldName="supplierName" onSearch={value => this.onSearch(value)} />
              <Button type="primary" onClick={this.onAdd}>增加</Button>
            </div>
            <SupplierList />
          </div>
        }
        {
          pageType === 'add' &&
          <div>
            <Title title="供应商资料" />
            <SupplierForm />
          </div>
        }
        {
          pageType === 'modify' &&
          <div>
            <Title title="供应商资料" />
            <SupplierForm />
          </div>
        }
        {
          pageType === 'details' &&
          <div>
            <Title title="供应商资料" />
            <SupplierForm />
          </div>
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { suppliers: state.suppliers }
}

export default connect(mapStateToProps)(Suppliers);
