import React from 'react';
import { connect } from 'dva';
import { Table, Icon } from 'antd';
import Spliter from '../../../Spliter/Spliter';
import ListEditCell from '../../../ListEditCell/ListEditCell';
import EditCell from '../../../EditCell/EditCell';
import { footerClass, footerItem } from './index.css';


class OrderGrid extends React.Component {

  onAddRow = (index) => {
    const { dispatch } = this.props;
    dispatch({
      type:'orders/addOrederProduct',
      payload:index
    })
    // const { order } = this.state;
    // const newProductRow = { ...this.defaultProduct, key: order.products.length + 1 }
    // order.products.push(newProductRow);
    // this.setState({ order: order });
  }

  onDeleteRow = (index) => {
    const { dispatch } = this.props;
    dispatch({
      type:'orders/deleteOrderProduct',
      payload:index
    })
  }

  updateOrderProduct = (index, obj) => {

    const { updateOrder } = this.props;
    const { order } = this.state;
    let { totalAmount = 0 } = this.state;
    const { products = [] } = order;
    const currProductRow = products[index];
    const newProductRow = { ...currProductRow, ...obj }
    newProductRow.amount = newProductRow.quantity * newProductRow.price;
    order.products[index] = newProductRow;
    for (let i of products) {
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
    const { pageType,order,productList } = this.props.orders;
    console.log('orders',this.props.orders);
    const disabled = pageType == 'details' ? true:false;
    const columns = [
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
          disabled ||
          <div style={{ textAlign: 'center' }}>
            <a onClick={()=>this.onAddRow(index)}><Icon type="plus" /></a>
            <Spliter />
            <a onClick={()=>this.onDeleteRow(index)}><Icon type="minus" /></a>
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
            defaultProduct={record}
            disabled={disabled}
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
            defaultValue={text}
            disabled={disabled}
            onInputValue={(number) => this.updateOrderProduct(index, { quantity: number })}
          />
        )
      }, {
        title: '单位',
        dataIndex: 'productUnit',
        key: 'productUnit',
        render: (text, record, index) => {
          const { products = [] } = order;
          const { productUnit = "" } = products[index];
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
            defaultValue={text}
            disabled={disabled}
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
          <EditCell
            type="text"
            defaultValue={text}
            disabled={disabled}
            onInputValue={(remarks) => this.updateOrderProduct(index, { remarks })} />
        )
      }
    ];
    console.log(this.props.orders.order.products);
    return (
      <div>
        <Table
          dataSource={order.products}
          columns={columns}
          bordered
          pagination={false}
          footer={() => (
            <div className={footerClass}>
              <div className={footerItem}>
                <span>合计金额：￥</span>
                {order.totalAmount}
              </div>
              <div className={footerItem}>
                <span>支付金额：￥</span>
                <EditCell
                  type="number"
                  underLine="true"
                  defaultValue={order.paymentAmount}
                  onInputValue={this.updatePaymentAmount}
                  disabled={disabled}
                />
              </div>
            </div>
          )
          } />
      </div>
    )
  }

}

function mapStateToProps(state){
  return { orders:state.orders}
}

export default connect(mapStateToProps)(OrderGrid);
