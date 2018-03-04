import React from 'react';
import { Icon, Select } from 'antd';
import { selectClass, textClass } from './index.css';
const Option = Select.Option;



class ListEditCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyState: false,
      selectProduct: null,
    }
  }

  onChange = (index) => {
    const {productList} = this.props;
    const product = productList[index];

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
    const { productList, record } = this.props;
    const { modifyState, selectProduct } = this.state;
    const productName = selectProduct?selectProduct.productName:"";
    return (
      modifyState ?
        <div>
          <Select className={selectClass} onChange={this.onChange}>
            {
              productList.map((item, index) => (
                <Option key={index} value={index}>{item.productName}</Option>
              ))
            }
          </Select>
          <Icon type="check" onClick={this.onSelect} />
        </div>
        :
        <div>
          <span className={textClass}>{productName}</span>
          <Icon type="edit" onClick={this.changeModifyState} />
        </div>
    )
  }

}

export default ListEditCell;
