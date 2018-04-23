import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import { numberFormat } from '../../../utils/numberFormat';

function FundsGrid({ dispatch, resource }) {
  const dataSource = [];
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
      title: '购买金额',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
      render: (text) => <span>{numberFormat(text)}</span>
    },
    {
      title: '销售金额',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (text) => <span>{numberFormat(text)}</span>
    },
    {
      title: '利润额',
      dataIndex: 'profitPrice',
      key: 'profitPrice',
      render: (text) => <span style={{ color: "red" }}>{numberFormat(text)}</span>
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

export default connect(mapStateToProps)(FundsGrid);
