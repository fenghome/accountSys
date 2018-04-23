import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import OrderSearchBar from '../../components/Orders/OrderSearchBar/OrederSearchBar';
import OrderList from '../../components/Orders/OrderList/OrderList';
import AddOrder from '../../components/Orders/AddOrder/AddOrder';
import ModifyOrder from '../../components/Orders/ModifyOrder/ModifyOrder';
import { orderContainer, orderBar } from './index.css';

class Orders extends Component {

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orders/getOrderNumber'
    });
    dispatch({
      type: 'orders/addBreadcrumbItem',
      payload: {
        item: ['新增订单', '/orders/addorder']
      }
    });
    dispatch({
      type: 'orders/changePageType',
      payload: 'add'
    });
    dispatch({
      type: 'orders/setDefaultOrder'
    });
  }

  render() {
    const { pageType, breadcrumbItems } = this.props.orders;
    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        {
          pageType == 'show' && (
            <div className={orderContainer}>
              <div className={orderBar}>
                <OrderSearchBar />
                <Button type="primary" onClick={this.onAdd}>添加</Button>
              </div>
              <OrderList />
            </div>
          )
        }
        {
          pageType == 'add' && (
            <div className={orderContainer}>
              <AddOrder />
            </div>
          )
        }
        {
          pageType == 'modify' && (
            <div className={orderContainer}>
              <AddOrder />
            </div>
          )
        }
        {
          pageType == 'details' && (
            <div className={orderContainer}>
             <AddOrder />
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
