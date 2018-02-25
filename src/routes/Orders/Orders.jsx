import React, { Component } from 'react';
import { connect } from 'dva';

import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import OrderSearchBar from '../../components/Orders/OrderSearchBar/OrederSearchBar';
import { orderContainer } from './index.css';

class Orders extends Component {
  render() {
    const { orders: { pageType, breadcrumbItems } } = this.props;


    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        {
          pageType == 'show' && (
            <div className={orderContainer}>
              <OrderSearchBar />
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
