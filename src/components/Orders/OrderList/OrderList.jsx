import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import * as moment from 'moment';
import numberFormat from '../../../utils/numberFormat';

function OrderList({orders,onModify,onDelete,onDetails}) {

  function onDelete(value){
    console.log(value);
  }

  const columns = [{
    title: '序号',
    dataIndex: 'serialNumber',
    key:'serialNumber',
    render: (text, record, index) => <sapn>{index + 1}</sapn>,
  },
  {
    title: '下单日期',
    dataIndex: 'createInstance',
    key: 'createInstance',
    render: (text) => <span>{moment.parseZone(text).local().format('YYYY-MM-DD HH:mm')}</span>
  },
  {
    title: '单据编号',
    dataIndex: 'orderNumber',
    key: 'orderNumber'
  },
  {
    title: '客户名称',
    dataIndex: 'customerName',
    key: 'customerName'
  },
  {
    title: '应付金额',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: (text, rocord, index) => numberFormat(text)
  },
  {
    title: '已付金额',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount',
    render: (text, record, index) => numberFormat(text)
  },
  {
    title: '备注',
    dataIndex: 'mem',
    key: 'mem'
  },
  {
    title: '操作',
    key:'operation',
    render: (text, record) => (
      <p>
        <a onClick={()=>{onModify(record['_id'])}}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm title="确定要删除记录？" onConfirm={()=>{onDelete(record['_id'])}}  okText="确定" cancelText="取消">
          <a>删除</a>
        </Popconfirm>
        <Divider type="vertical" />
        <a onClick={()=>{onDetails(record['_id'])}}>详情</a>
      </p>
    )
  }];


  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      // name: record.name,
    }),
  };

  return (
    <Table rowSelection={rowSelection} columns={columns} dataSource={orders} />
  )
}

export default OrderList;
