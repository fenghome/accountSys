import React from 'react';
import { Table, Button, Divider, Pagination, Popconfirm } from 'antd';

function ProductList({ products, total, currentPage, onModify, onDetails, onDelete, onPageChange }) {
  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text, record, index) => <span>{index + 1}</span>
    }, {
      title: '商品图片',
      dataIndex: 'productImg',
      key: 'productImg',
      render: (text, record, index) => {
        if (text) {
          return <img style={{
            width: 100
          }} src={text} alt="商品图片" />
        } else {
          return <span>暂无图片</span>
        }
      }
    }, {
      title: '商品编号',
      dataIndex: 'productCode',
      key: 'productCode'
    }, {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName'
    }, {
      title: '商品类别',
      dataIndex: 'productType',
      key: 'productType'
    }, {
      title: '单位',
      dataIndex: 'productUnit',
      key: 'productUnit'
    }, {
      title: '操作',
      key: 'option',
      render: (text, record, index) => (
        <span>
          <a onClick={() => { onModify(record) }}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => { onDetails(record) }}>详情</a>
          <Divider type="vertical" />
          <Popconfirm title="确实要删除产品吗" onConfirm={() => { onDelete(record) }}  okText="是" cancelText="否">
            <a>删除</a>
          </Popconfirm>

        </span>
      )
    }
  ];

  const rowSelection = {};

  return (
    <div>
      <Table
        rowKey={record => record._id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={products}
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

export default ProductList;
