import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProductList from '../../components/Products/PorductList/ProductList';
import { productsBar, productContainer } from './index.css';

class Products extends Component {

  onSearch = (value)=>{
    console.log(value);
  }

  render() {
    const { breadcrmbItems, products } = this.props.products;
    return (
      <div>
        <BreadcrumbList
          breadcrumbItems={breadcrmbItems}
        />
        <div className={productsBar}>
          <SearchForm
            label="商品名称："
            fieldName="productName"
            onSearch={this.onSearch}
          />
          <Button type="primary">添加</Button>
        </div>
        <div className={productContainer}>
          <ProductList />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products }
}

export default connect(mapStateToProps)(Products);
