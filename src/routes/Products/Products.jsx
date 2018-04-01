import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import SearchForm from '../../components/SearchForm/SearchForm';
import ProductList from '../../components/Products/PorductList/ProductList';
import Title from '../../components/Title/Title';
import ProductForm from '../../components/Products/ProductForm/ProductForm';
import { productsBar, productContainer } from './index.css';

class Products extends Component {

  componentWillReceiveProps(nextProps) {
    const { dispatch, products: { msg } } = nextProps;
    if (msg) {
      message.info(msg);
      dispatch({
        type: 'products/setMessage',
        payload: ''
      })
    }
  }

  onSearch = (value) => {
    this.props.dispatch({
      type: 'products/setSearchProductName',
      payload: value.productName
    });
    this.props.dispatch({
      type: 'products/getProducts'
    })
  }

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/changePageType',
      payload: 'add'
    });
    dispatch({
      type: 'products/addBreadcrumb',
      payload: ['新增商品', '/product/add']
    });
    dispatch({
      type: 'products/initCurrentProduct'
    })
  }

  onModify = (recoder) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/changePageType',
      payload: 'modify'
    });
    dispatch({
      type: 'products/addBreadcrumb',
      payload: ['修改商品', '/product/modify']
    });
    dispatch({
      type: 'products/changeCurrentProduct',
      payload: recoder
    });
  }

  onDetails = (recoder) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/changePageType',
      payload: 'details'
    });
    dispatch({
      type: 'products/addBreadcrumb',
      payload: ['浏览商品', '/product/details']
    });
    dispatch({
      type: 'products/changeCurrentProduct',
      payload: recoder
    })
  }

  onFormConfirm = (values) => {
    const { dispatch } = this.props;
    const url = values.productImg.length > 0 ? values.productImg[0].response.data.url : '';
    const data = { ...values, productImg: url };
    dispatch({
      type: 'products/saveProduct',
      payload: data
    });
  }

  onFormCancel = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/initState'
    });
    dispatch({
      type: 'products/getProducts'
    })
  }

  onRemoveFile = (values) => {
    this.props.dispatch({
      type: 'products/removeFile',
      payload: { fileName: values.file.name }
    })
  }

  onPageChange = (values)=>{

  }
  render() {
    const { pageType, breadcrmbItems, products, currProduct,total,currentPage } = this.props.products;
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
            <ProductList
              products={products}
              onModify={this.onModify}
              onDetails={this.onDetails}
              total={total}
              currentPage={currentPage}
              onPageChange={this.onPageChange}
            />
          </div>
        }
        {
          pageType === "add" &&
          <div className={productContainer}>
            <Title title="商品信息" />
            <ProductForm
              onConfirm={values => this.onFormConfirm(values)}
              onCancel={values => this.onFormCancel(values)}
              onRemoveFile={values => this.onRemoveFile(values)}
            />
          </div>
        }
        {
          pageType === "modify" &&
          <div className={productContainer}>
            <Title title="商品信息" />
            <ProductForm
              product={currProduct}
              onConfirm={values => this.onFormConfirm(values)}
              onCancel={values => this.onFormCancel(values)}
              onRemoveFile={values => this.onRemoveFile(values)}
            />
          </div>
        }
        {
          pageType === "details" &&
          <div className={productContainer}>
            <Title title="商品信息" />
            <ProductForm
              product={currProduct}
              disabled={true}
              onCancel={values => this.onFormCancel(values)}
            />
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
