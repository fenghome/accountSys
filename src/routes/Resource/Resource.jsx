import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import SearchBar from '../../components/Resource/SearchBar/SearchBar';
import { reaourceBar } from './index.css';

class Resource extends Component {

  onSearch = (values) => {
    console.log('values is',values);
  }

  render() {
    const { breadcrumbItems, products } = this.props.resource;
    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        <div className={reaourceBar}>
          <SearchBar label="商品名称:" list={products} onSearch={this.onSearch}/>
          <Button type="primary">结算</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { resource: state.resource }
}

export default connect(mapStateToProps)(Resource);
