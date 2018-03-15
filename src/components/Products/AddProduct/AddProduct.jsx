import React from 'react';
import { Form, Input, Upload, Button, Icon } from 'antd';
import { connect } from 'dva';
import Title from '../../Title/Title';
import ProductForm from '../ProdctCommon/ProductForm/ProductForm';
const FormItem = Form.Item;

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    }
  }

  onConfirm = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/saveProduct',
      payload: values
    });
    console.log(values);
  }

  onCancel = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/changePageType',
      payload: 'show'
    });
    dispatch({
      type: 'products/initCurrentProduct'
    })
    console.log(values);
  }

  render() {
    return (
      <div>
        <Title title="商品信息" />
        <ProductForm
          onConfirm={values => this.onConfirm(values)}
          onCancel={values => this.onCancel(values)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products }
}
export default connect(mapStateToProps)(AddProduct);
