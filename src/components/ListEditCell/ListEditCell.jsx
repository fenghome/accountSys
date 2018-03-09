import React from 'react';
import { Icon, Select } from 'antd';
import { listEditCell, selectClass, textClass } from './index.css';
const Option = Select.Option;



class ListEditCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyState: false,
      selectProduct: props.defaultProduct || null,
    }
  }

  onChange = (productId) => {
    const {productList} = this.props;
    const product = productList.find((item)=>{
      return item.productId == productId;
    })

    this.setState({
      selectProduct:product
    })
  }

  changeModifyState = () => {
    this.setState({
      modifyState: true
    })
  }

  onSelect = () => {
    this.setState({
      modifyState:false
    })
    const { onSelectProduct } = this.props;
    onSelectProduct(this.state.selectProduct);
  }

  render() {
    const { productList, record, defaultProductName="", disabled=false } = this.props;
    const { modifyState, selectProduct } = this.state;
    const productName = selectProduct.productName || "";
    return (
      modifyState ?
        <div className={listEditCell}>
          <Select className={selectClass} onChange={this.onChange} defaultValue={productName} >
            {
              productList.map((item, index) => (
              <Option key={item.productId} value={item.productId}>{item.productName}</Option>
            ))
            }
          </Select>
          <Icon type="check" onClick={this.onSelect} />
        </div>
        :
        <div className={listEditCell}>
          <span className={textClass}>{productName}</span>
          {disabled || <Icon type="edit" onClick={this.changeModifyState} />}
        </div>
    )
  }

}

export default ListEditCell;
