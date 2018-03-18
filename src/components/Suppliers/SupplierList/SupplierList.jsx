import React from 'react';
import { Table, Button, Divider } from 'antd';
import { tableClass } from './index.css';

function SupplierList({ suppliers, onModify, onDetails }) {

  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      key: 'supplierName'
    },
    {
      title: '联系人',
      dataIndex: 'contactPeople',
      key: 'contactPeople'
    },
    {
      title: '联系方式',
      dataIndex: 'contactPhone',
      key: 'contactPhone'
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '备注',
      dataIndex: 'mem',
      key: 'mem'
    },
    {
      title: '操作',
      key: 'option',
      render: (text, record, index) => (
        <span>
          <a onClick={() => onModify(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => onDetails(record)}>详情</a>
        </span>
      )
    }
  ]

  return (
    <Table
      className={tableClass}
      rowKey={record => record._id}
      columns={columns}
      dataSource={suppliers} />
  )
}

export default SupplierList;
