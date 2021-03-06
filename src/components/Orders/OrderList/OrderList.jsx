import React from 'react';
import { connect } from 'dva';
import { Table, Divider, Popconfirm,Pagination } from 'antd';
import * as moment from 'moment';
import numberFormat from '../../../utils/numberFormat';

function OrderList({ dispatch, orders: { orders, total, currentPage } }) {

  function onDetails(order) {
    dispatch({
      type: 'orders/addBreadcrumbItem',
      payload: {
        item: ['浏览订单', '/orders/detailsorder']
      }
    });
    dispatch({
      type: 'orders/changePageType',
      payload: 'details'
    });
    dispatch({
      type: 'orders/setOrder',
      payload: order
    });
  }

  function onModify(order) {
    dispatch({
      type: 'orders/addBreadcrumbItem',
      payload: {
        item: ['编辑订单', '/orders/modifyorder']
      }
    });
    dispatch({
      type: 'orders/changePageType',
      payload: 'modify'
    });
    dispatch({
      type: 'orders/setOrder',
      payload: order
    });
  }

  function onDelete(orderId) {
    dispatch({
      type: 'orders/deleteOrderById',
      payload: orderId
    });
  }

  function onPageChange(page){
    dispatch({
      type:'orders/setCurrentPage',
      payload:page
    });
    dispatch({
      type:'orders/getOrders'
    })
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
    key: 'operation',
    render: (text, record) => (
      <div>
        <a onClick={() => { onModify(record) }}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm title="确定要删除记录？" onConfirm={() => { onDelete(record['_id']) }} okText="确定" cancelText="取消">
          <a>删除</a>
        </Popconfirm>
        <Divider type="vertical" />
        <a onClick={() => { onDetails(record) }}>详情</a>
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
    <div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey={record => record.orderNumber}
        rowSelection={rowSelection}
        pagination={false} />
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

function maptStateToProps(state) {
  return { orders: state.orders };
}

export default connect(maptStateToProps)(OrderList);
