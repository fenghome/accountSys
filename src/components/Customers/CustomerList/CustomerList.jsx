import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import { tableClass } from './index.css';

function CustomerList({ customers, onModify, onDetails, onDelete }) {

  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '联系人',
      dataIndex: 'contactPeople',
      key: 'contactPeople',
    },
    {
      title: '联系方式',
      dataIndex: 'contactPhone',
      key: 'contactPhone'
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '备注',
      dataIndex: 'mem',
      key: 'mem',
    },
    {
      title: '操作',
      key: 'option',
      render: (text, record, index) => (
        <span>
          <a onClick={() => onModify(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => onDetails(record)}>浏览</a>
          <Divider type="vertical" />
          <Popconfirm title="确定要删除这个客户吗？"
            onConfirm={() => { onDelete(record['_id']) }}
            okText="是"
            cancelText="否"
          >
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <Table
      className={tableClass}
      columns={columns}
      dataSource={customers}
      rowKey={record => record._id}
    />
  )
}

export default CustomerList;
