import React from 'react';
import { Table, Icon } from 'antd';
import Spliter from '../../../Spliter/Spliter';
import ListEditCell from '../../../ListEditCell/ListEditCell';
import EditCell from '../../../EditCell/EditCell';
import { footerClass, footerItem } from './index.css';

class OrderGrid extends React.Component {

  constructor(props) {

    super(props);
    this.defaultProduct = {
      key: '0',
      productId: '',
      productName: '',
      quantity: 0,
      productUnit: '',
      price: 0,
      amount: 0,
      remarks: ''
    }

    this.state = {
      order:
        {
          sequence: props.order.sequence,
          orderNumber: props.order.orderNumber,
          customerId: null,
          product: [
            this.defaultProduct
          ],
          totalAmount: 0,
          paymentAmount: 0,
          men: ''
        }

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
            onSelectProduct={(product) => {
              this.updateOrderProduct(index, {
                productId: product['_id'],
                productId: product['productName'],
                productUnit: product['productUnit']
              })
            }}
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
            onInputValue={(number) => this.updateOrderProduct(index, { quantity: number })}
          />
        )
      }, {
        title: '单位',
        dataIndex: 'productUnit',
        key: 'productUnit',
        render: (text, record, index) => {
          const { product = [] } = this.state.order;
          const { productUnit = "" } = product[index];
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
            onInputValue={(price) => this.updateOrderProduct(index, { price })}
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
          <EditCell type="text" onInputValue={(remarks) => this.updateOrderProduct(index, { remarks })} />
        )
      }
    ];
  }

  onAddRow = () => {
    const { order } = this.state;
    const newProductRow = { ...this.defaultProduct, key: order.product.length + 1 }
    order.product.push(newProductRow);
    this.setState({ order: order });
  }

  onDeleteRow = () => {
    const { order } = this.state;
    if (order.product.length >= 2) {
      order.product.pop();
      this.setState({ order: order });
    }
  }

  updateOrderProduct = (index, obj) => {
    const { updateOrder } = this.props;
    const { order } = this.state;
    let { totalAmount = 0 } = this.state;
    const { product = [] } = order;
    const currProductRow = product[index];
    const newProductRow = { ...currProductRow, ...obj }
    newProductRow.amount = newProductRow.quantity * newProductRow.price;
    order.product[index] = newProductRow;
    for (let i of product) {
      totalAmount = totalAmount + i.amount;
    }
    order.totalAmount = totalAmount;
    this.setState({
      order
    });
    updateOrder(this.state.order);
  }

  updatePaymentAmount = (value) => {
    const { updateOrder } = this.props;
    const { order } = this.state;
    order.paymentAmount = value;
    this.setState({
      order: order
    });
    updateOrder(order);
  }



  render() {
    const { order } = this.state;
    return (
      <div>
        <Table
          dataSource={order.product}
          columns={this.columns}
          bordered
          pagination={false}
          footer={() => (
            <div className={footerClass}>
              <div className={footerItem}>
                <span>合计金额：￥</span>
                {this.state.order.totalAmount}
              </div>
              <div className={footerItem}>
                <span>支付金额：￥</span>
                <EditCell type="number" underLine="true" onInputValue={this.updatePaymentAmount} />
              </div>
            </div>
          )
          } />
      </div>
    )
  }

}

export default OrderGrid;
