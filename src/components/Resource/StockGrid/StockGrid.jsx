import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import { numberFormat } from '../../../utils/numberFormat';

function StockGrid({ dispatch, resource}) {
  const dataSource=[];
  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: '商品编码',
      dataIndex: 'productCode',
      key: 'productCode',
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '商品类别',
      dataIndex: 'productType',
      key: 'productType',
    },
    {
      title: '商品单位',
      dataIndex: 'productUnit',
      key: 'productUnit',
    },
    {
      title: '入库量',
      dataIndex: 'inAmount',
      key: 'inAmount',
    },
    {
      title: '出库量',
      dataIndex: 'outAmount',
      key: 'outAmount',
    },
    {
      title: '库存量',
      dataIndex: 'amount',
      key: 'amount',
      render: text => <span style={{ color: "red" }}>text</span>
    },
    {
      title: '销售均价',
      dataIndex: 'averagePrice',
      key: 'averagePrice',
      render: (text, record, index) => <span>{record._id == 'total' ? numberFormat(text) : null}</span>
    },
    {
      title: '库存资金',
      dataIndex: 'stockFunds',
      key: 'stockFunds',
      render: (text, record, index) => <span style={{ color: "red" }}>{numberFormat(text)}</span>
    }
  ]

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}

function mapStateToProps(state) {
  return { resource: state.resource }
}
export default connect(mapStateToProps)(StockGrid);
