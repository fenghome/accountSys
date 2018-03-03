import React from 'react';
import { Icon, Select } from 'antd';
import { select } from './index.css';
const Option = Select.Option;



class ListEditCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyState: false,
      selectProduct: null,
    }
  }

  onChange = (value,option) => {
    const productId = value;
    const productName = option.props.children;
    const selectProduct = {productId,productName};
    this.setState({
      selectProduct:selectProduct
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
    const { productList, record } = this.props;
    const { modifyState, selectProduct } = this.state;
    const productName = selectProduct?selectProduct.productName:"";
    return (
      modifyState ?
        <div>
          <Select className={select} onChange={this.onChange}>
            {
              productList.map((item, index) => (
                <Option key={index} value={item._id}>{item.productName}</Option>
              ))
            }
          </Select>
          <Icon type="check" onClick={this.onSelect} />
        </div>
        :
        <span>
          {productName}
          <Icon type="edit" onClick={this.changeModifyState} />
        </span>
    )
  }

}

export default ListEditCell;
