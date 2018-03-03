import React from 'react';
import { Table, Icon } from 'antd';
import Spliter from '../../../Spliter/Spliter';
import ListEditCell from '../ListEditCell/ListEditCell';

class OrderGrid extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      order : [
        {
          serialNumber: 1,
          product:null,
          quantity:0,
          productUnit:'',
          price:0,
          remarks:''
        }
      ]
    }

    const { productList } = this.props;

    this.columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        width:'10%',
        render: (text, record, index) => <span>{index + 1}</span>
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        width:'20%',
        render: (text, record, index) => (
          <span>
            <a onClick={this.onAddRow}><Icon type="plus" /></a>
            <Spliter />
            <a onClick={this.onDeleteRow}><Icon type="minus" /></a>
          </span>
        )
      },
      {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
        width:'20%',
        render: (text, record, index) => (

          <ListEditCell
            productList={productList}
            record={record}
            onSelectProduct={this.onSelectProduct} />
          )
      }
    ];
  }



  onAddRow = ()=> {
    const { order } = this.state;
    const newOrder = order.push({ key: 3 });
    this.setState({
      order: newOrder
    });
  }

  onDeleteRow = ()=> {
    const { order } = this.state;
    const newOrder = order.pop();
    this.setState({
      order: newOrder
    });
  }

  onSelectProduct = (product)=>{
    console.log(product);
  }

  render() {
    const {order} = this.state;
    return (
      <div>
        <Table dataSource={order} columns={this.columns} />
      </div>
    )
  }

}

export default OrderGrid;
