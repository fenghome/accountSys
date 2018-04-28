import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import SearchBar from '../../components/Resource/SearchBar/SearchBar';
import Title from '../../components/Title/Title';
import StockGrid from '../../components/Resource/StockGrid/StockGrid';
import FundsGrid from '../../components/Resource/FundsGrid/FundsGird';
import { reaourceBar,gridClass } from './index.css';

class Resource extends Component {

  onSettlement = ()=>{
    const { dispatch } = this.props;
    dispatch({
      type:'resource/onSettlement'
    })
  }

  render() {
    const { breadcrumbItems, products } = this.props.resource;
    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        <div className={reaourceBar}>
          <SearchBar />
          <Button type="primary" onClick={this.onSettlement}>结算</Button>
        </div>
        <div className={gridClass}>
          <Title title="仓库明细表" />
          <StockGrid />
        </div>
        <div className={gridClass}>
          <Title title="资金明细表" />
          <FundsGrid />
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { resource: state.resource }
}

export default connect(mapStateToProps)(Resource);
