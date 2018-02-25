import React, { Component } from 'react';
import { connect } from 'dva';

import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import { orderContainer } from './index.css';

class Orders extends Component {
  render() {
    const { orders: { pageType, breadcrumbItems } } = this.props;


    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        {
          (pageType == 'show') && (
            <div class={orderContainer}>
            </div>
          )

          (pageType == 'add') && (
            <div class={orderContainer}>
            </div>
          )

          (pageType == 'edit') && (
            <div class={orderContainer}>
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
