import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import OrderSearchBar from '../../components/Orders/OrderSearchBar/OrederSearchBar';
import OrderList from '../../components/Orders/OrderList/OrderList';
import AddOrder from '../../components/Orders/OrderCommon/OrderTitle/OrderTitle';
import { orderContainer, orderBar } from './index.css';

class Orders extends Component {

  onSearch = (values) => {
    //取得values对orders的数据进行筛选
    console.log(values);
  }

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orders/getOrderNumber'
    });
  }

  onDetails = () => {

  }
  onModify = () => {

  }

  onDelete = () => {

  }

  render() {
    const { orders: { pageType, breadcrumbItems, customers, orders } } = this.props;
    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        {
          pageType == 'show' && (
            <div className={orderContainer}>
              <div className={orderBar}>
                <OrderSearchBar customers={customers} onSearch={this.onSearch} />
                <Button type="primary" onClick={this.onAdd}>添加</Button>
              </div>
              <OrderList
                orders={orders}
                onModify={this.onModify}
                onDelete={this.onDelete}
                onDetails={this.onDetails}
              />
            </div>
          )
        }
        {
          pageType == 'add' && (
            <div className={orderContainer}>
              <div>
                <AddOrder />
              </div>
            </div>
          )
        }



      </div>
    )
  }
}

function mapStateToProps(state) {
  return { orders: state.orders }
}

export default connect(mapStateToProps)(Orders);
