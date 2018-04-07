import React from 'react';
import { connect } from 'dva';
import { Table, Button, Divider, Popconfirm, Pagination } from 'antd';
import { tableClass } from './index.css';

function SupplierList({ dispatch, suppliers: { suppliers, total, currentPage } }) {

  function onModify(recoder) {
    dispatch({
      type: 'suppliers/changToModifyPage',
      payload: recoder
    })
  }

  function onDetails(recoder) {
    dispatch({
      type: 'suppliers/chanToDetailsPage',
      payload: recoder
    })
  }

  function onDelete(recoder) {
    dispatch({
      type: 'suppliers/deleteSupplier',
      payload: recoder._id
    })
  }

  function onPageChange(page) {
    dispatch({
      type: 'suppliers/setCurrentPage',
      payload: page
    });
    dispatch({
      type: 'suppliers/getSuppliers'
    })
  }

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
          <Divider type="vertical" />
          <Popconfirm title="你确定删除吗?"
            onConfirm={() => onDelete(record)}
            okText="是"
            cancelText="否">
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    }
  ]

  return (
    <div>
      <Table
        className={tableClass}
        rowKey={record => record._id}
        columns={columns}
        dataSource={suppliers}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        pageSize={2}
        current={parseInt(currentPage)}
        onChange={onPageChange}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return { suppliers: state.suppliers }
}

export default connect(mapStateToProps)(SupplierList);
