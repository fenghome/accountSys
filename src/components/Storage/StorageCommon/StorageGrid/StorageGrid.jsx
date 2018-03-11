import React from 'react';
import { Table, Icon } from 'antd';
import Spliter from '../../../Spliter/Spliter';
import ListEditCell from '../../../ListEditCell/ListEditCell';
import EditCell from '../../../EditCell/EditCell';
import { footerClass, footerItem } from './index.css';

class StorageGrid extends React.Component {

  constructor(props) {
    super(props);
    const { disabled = false } = props
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

    this.defaultStorageSingle = {
      sequence: props.order.sequence,
      orderNumber: props.order.orderNumber,
      customerId: null,
      products: [
        this.defaultProduct
      ],
      totalAmount: 0,
      paymentAmount: 0,
      men: ''
    }
    this.state = {
      storageSingle: props.storageSingle
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
          disabled ||
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
          const { products = [] } = this.state.order;
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
            onInputValue={(price) => this.updateStorageProduct(index, { price })}
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
            onInputValue={(remarks) => this.updateStorageProduct(index, { remarks })} />
        )
      }
    ];
  }

  onAddRow = () => {
    const { storageSingle } = this.state;
    const newProductRow = { ...this.defaultProduct, key: storageSingle.products.length + 1 }
    storageSingle.products.push(newProductRow);
    this.setState({ storageSingle });
  }

  onDeleteRow = () => {
    const { storageSingle } = this.state;
    if (storageSingle.products.length >= 2) {
      storageSingle.products.pop();
      this.setState({ storageSingle });
    }
  }

  updateStorageProduct = (index, obj) => {
    const { updateStorageSingle } = this.props;
    const { storageSingle } = this.state;
    let { totalAmount = 0 } = this.state;
    const { products = [] } = order;
    const currProductRow = products[index];
    const newProductRow = { ...currProductRow, ...obj }
    newProductRow.amount = newProductRow.quantity * newProductRow.price;
    order.products[index] = newProductRow;
    for (let i of products) {
      totalAmount = totalAmount + i.amount;
    }
    storageSingle.totalAmount = totalAmount;
    this.setState({
      storageSingle
    });
    updateStorageSingle(this.state.storageSingle);
  }

  updatePaymentAmount = (value) => {
    const { updateStorageSingle } = this.props;
    const { storageSingle } = this.state;
    storageSingle.paymentAmount = value;
    this.setState({
      storageSingle
    });
    updateStorageSingle(order);
  }



  render() {
    const { disabled = false } = this.props;
    const { storageSingle } = this.state;
    return (
      <div>
        <Table
          dataSource={storageSingle.products}
          columns={this.columns}
          bordered
          pagination={false}
          footer={() => (
            <div className={footerClass}>
              <div className={footerItem}>
                <span>合计金额：￥</span>
                {this.state.storageSingle.totalAmount}
              </div>
              <div className={footerItem}>
                <span>支付金额：￥</span>
                <EditCell
                  type="number"
                  underLine="true"
                  defaultValue={storageSingle.paymentAmount}
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

export default StorageGrid;
