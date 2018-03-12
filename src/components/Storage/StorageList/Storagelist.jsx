import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import * as moment from 'moment';
import numberFormat from '../../../utils/numberFormat';

function StorageList({ list, onModify, onDelete, onDetails }) {

  function onDelete(value) {
    console.log(value);
  }

  const columns = [{
    title: '序号',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
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
    dataIndex: 'noteNumber',
    key: 'noteNumber'
  },
  {
    title: '客户名称',
    dataIndex: 'supplierName',
    key: 'supplierName'
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
    key: 'operation',
    render: (text, record) => (
      <div>
        <a onClick={() => { onModify(record.noteNumber) }}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm title="确定要删除记录？" onConfirm={() => { onDelete(record.noteNumber) }} okText="确定" cancelText="取消">
          <a>删除</a>
        </Popconfirm>
        <Divider type="vertical" />
        <a onClick={() => { onDetails(record.noteNumber) }}>详情</a>
      </div>
    )
  }
  ];


	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
		onSelect: (record, selected, selectedRows) => {
			console.log(record, selected, selectedRows);
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			console.log(selected, selectedRows, changeRows);
		},
		getCheckboxProps: record => ({
			disabled: record.name === 'Disabled User',    // Column configuration not to be checked
		}),
	};


  return (
    <Table
      columns={columns}
      dataSource={list}
      rowKey={record => record.noteNumber}
      rowSelection={rowSelection} />
  )
}

export default StorageList;
