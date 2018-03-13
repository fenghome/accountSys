import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProductList from '../../components/Products/PorductList/ProductList';
import AddProduct from '../../components/Products/AddProduct/AddProduct';
import { productsBar, productContainer } from './index.css';

class Products extends Component {

  onSearch = (value)=>{ 
    console.log(value);
  }

  onAdd = ()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'products/changePageType',
      payload:'add'
    });
    dispatch({
      type:'products/initCurrentProduct'
    })
  }

  render() {
    const { pageType, breadcrmbItems, products } = this.props.products;

    return (
      <div>
        <BreadcrumbList
          breadcrumbItems={breadcrmbItems}
        />
   
          {
            pageType === "show" &&
            <div className={productContainer}>
              <div className={productsBar}>
                <SearchForm
                  label="商品名称："
                  fieldName="productName"
                  onSearch={this.onSearch}
                />
                <Button type="primary" onClick={this.onAdd}>添加</Button>
              </div>
              <ProductList products={products}/>
            </div> 
          }
          {
            pageType === "add" &&
            <div className={productContainer}>
              <AddProduct />
            </div>
          }

      
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products }
}

export default connect(mapStateToProps)(Products);
