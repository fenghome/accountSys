import React from 'react';
import { Table, Button, Divider } from 'antd';

function ProductList({products}) {
  const columns = [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: '商品图片',
      dataIndex: 'productImg',
      key: 'productImg',
      render: (text, record, index) => {
        if (text) {
          return <img style={{ width: 100 }} src={text} alert="商品图片" />
        } else {
          return <span>暂无图片</span>
        }
      }
    },
    {
      title: '商品编号',
      dataIndex: 'productCode',
      key: 'productCode'
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: '商品类别',
      dataIndex: 'productType',
      key: 'productType'
    },
    {
      title: '单位',
      dataIndex: 'productUnit',
      key: 'productUnit',
    },
    {
      title: '操作',
      key: 'option',
      render: (text, record, index) => (
        <span>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>详情</a>
        </span>
      )
    }
  ];

  const rowSelection = {

  };

  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={products} />
    </div>
  )
}

export default ProductList;
