import React from 'react';
import {Table, Icon} from 'antd';
import Spliter from '../../../Spliter/Spliter';
import ListEditCell from '../../../ListEditCell/ListEditCell';
import EditCell from '../../../EditCell/EditCell';

class OrderGrid extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      order: [
        {
          serialNumber: 1,
          product: {},
          quantity: 0,
          price: 0,
          remarks: ''
        }
      ]
    }

    const {productList} = this.props;

    this.columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width: '10%',
        render: (text, record, index) => <span>{index + 1}</span>
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width: '20%',
        render: (text, record, index) => (
          <span>
            <a onClick={this.onAddRow}><Icon type="plus"/></a>
            <Spliter/>
            <a onClick={this.onDeleteRow}><Icon type="minus"/></a>
          </span>
        )
      }, {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: '20%',
        render: (text, record, index) => (<ListEditCell
          productList={productList}
          record={record}
          onSelectProduct={this.onSelectProduct}/>)
      }, {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantify',
        width: '10%',
        render: (text, record, index) => (<EditCell onInputValue={this.onInputNmber}/>)
      }, {
        title: '单位',
        dataIndex: 'productUnit',
        key: 'productUnit',
        width: '10%',
        render: (text, record, index) => {
          const {product={}} = this.state;
          const {  productUnit = ""  } = product;
          return <span>{productUnit}</span>
        }
      },{
        title:'单价',
        dataIndex:'price',
        key:'price',
        width:'10%',
        render:()=>{
          return <EditCell onInputValue={this.onInputPrice} />
        }
      }
    ];
  }

  onAddRow = () => {
    const {order} = this.state;
    const newOrder = order.push({key: 3});
    this.setState({order: newOrder});
  }

  onDeleteRow = () => {
    const {order} = this.state;
    const newOrder = order.pop();
    this.setState({order: newOrder});
  }

  onSelectProduct = (product) => {
    this.setState({product})
    //将order传出
  }

  onInputNmber = (value) => {
    console.log(value);
  }
  
  onInputPrice = (value)=> {
    console.log(value);
  }
  render() {
    const {order} = this.state;
    return (
      <div>
        <Table dataSource={order} columns={this.columns}/>
      </div>
    )
  }

}

export default OrderGrid;
