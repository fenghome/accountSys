import React from 'react';
import { Table, Icon } from 'antd';
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
          amount: 0,
          remarks: ''
        }
      ]
    }

    const { productList } = this.props;

    this.columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
        render: (text, record, index) => <span>{index + 1}</span>
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record, index) => (
          <div style={{ textAlign: 'center' }}>
            <a onClick={this.onAddRow}><Icon type="plus" /></a>
            <Spliter />
            <a onClick={this.onDeleteRow}><Icon type="minus" /></a>
          </div>
        )
      }, {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: '20%',
        render: (text, record, index) => (
        <ListEditCell
          productList={productList}
          record={record}
          onSelectProduct={(product) => { this.updateOrder(index, { product }) }}
          />
        )
      }, {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantify',
        width: '10%',
        render: (text, record, index) => (
          <EditCell
            type="number"
            onInputValue={(number) => this.updateOrder(index, { quantity: number })}
          />
        )
      }, {
        title: '单位',
        dataIndex: 'productUnit',
        key: 'productUnit',
        render: (text, record, index) => {
          const { product = {} } = this.state.order[index];
          const { productUnit = "" } = product;
          return <span>{productUnit}</span>
        }
      }, {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        render: (text, record, index) => (
          <EditCell
          type="number"
          onInputValue={(price) => this.updateOrder(index, { price })}
         />
        )
      }, {
        title: '金额/元',
        dataIndex: 'amount',
        key: 'amount'
      }, {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        width: '20%',
        render: (text, record, index) => (
          <EditCell type="text" onInputValue={(remarks) => this.updateOrder(index, { remarks })} />
        )
      }
    ];
  }

  onAddRow = () => {
    const { order } = this.state;
    const newOrderRow = order.push({ key: 3 });
    this.setState({ order: newOrderRow });
  }

  onDeleteRow = () => {
    const { order } = this.state;
    const newOrderRow = order.pop();
    this.setState({ order: newOrderRow });
  }

  updateOrder(index, obj) {
    const { order } = this.state;
    const currOrderRow = order[index];
    const newOrderRow = { ...currOrderRow, ...obj }
    newOrderRow.amount = newOrderRow.quantity * newOrderRow.price;
    order[index] = newOrderRow;
    this.setState({
      order
    });
    console.log(order);
  }
  render() {
    const { order } = this.state;
    return (
      <div>
        <Table dataSource={order} columns={this.columns} bordered />
      </div>
    )
  }

}

export default OrderGrid;
