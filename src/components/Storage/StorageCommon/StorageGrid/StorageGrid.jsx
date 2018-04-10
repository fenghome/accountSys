import React from 'react';
import { connect } from 'dva';
import { Table, Icon } from 'antd';
import Spliter from '../../../Spliter/Spliter';
import ListEditCell from '../../../ListEditCell/ListEditCell';
import EditCell from '../../../EditCell/EditCell';
import { footerClass, footerItem } from './index.css';

class StorageGrid extends React.Component {

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

  updateStorageSingleProduct = (index, obj) => {
    const { dispatch,storage } = this.props;
    const { storageSingle } = storage;
    const { products } = storageSingle;
    dispatch({
      type:'storage/updateStorageSingleProduct',
      payload:{index,obj}
    });
    dispatch({
      type:'storage/calculateTotalAmount'
    })
  }

  updatePaymentAmount = (value) => {
    const { updateStorageSingle } = this.props;
    const { storageSingle } = this.state;
    storageSingle.paymentAmount = value;
    this.setState({
      storageSingle
    });
    updateStorageSingle(storageSingle);
  }

  render() {
    const { storage } = this.props;
    const disabled = storage.pageType==='details' ? true : false;
    const { storageSingle={}, productList=[] } = storage;
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
            selectProductId={record.productId}
            disabled={disabled}
            onSelectProduct={(product) => {
              this.updateStorageSingleProduct(index, {
                productId: product['_id'],
                productName: product['productName'],
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
            onInputValue={(number) => this.updateStorageSingleProduct(index, { quantity: number })}
          />
        )
      }, {
        title: '单位',
        dataIndex: 'productUnit',
        key: 'productUnit',
        render: (text, record, index) => {
          const { products = [] } = storageSingle;
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
            onInputValue={(price) => this.updateStorageSingleProduct(index, { price })}
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
            onInputValue={(remarks) => this.updateStorageSingleProduct(index, { remarks })} />
        )
      }
    ];
    return (
      <div>
        <Table
          dataSource={storageSingle.products}
          columns={columns}
          bordered
          pagination={false}
          footer={() => (
            <div className={footerClass}>
              <div className={footerItem}>
                <span>合计金额：￥</span>
                {storageSingle.totalAmount}
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

function mapStateToProps(state){
  return { storage:state.storage}
}

export default connect(mapStateToProps)(StorageGrid);
