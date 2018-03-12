import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import StorageSearchBar from '../../components/Storage/StorageSearchBar/StorageSearchBar';
import StorageList from '../../components/Storage/StorageList/Storagelist';
import AddStorage from '../../components/Storage/AddStorage/AddStorage';
import ModifyStorage from '../../components/Storage/ModifyStorage/ModifyStorage';
import { storageContainer, storageBar } from './index.css';

class Storage extends Component {

  onSearch = (values) => {
    //取得values对orders的数据进行筛选
    console.log(values);
  }

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storage/getStorageNumber'
    });
    dispatch({
      type: 'storage/addBreadcrumbItem',
      payload: {
        item: ['新增入库', '/storage/add']
      }
    });
    dispatch({
      type: 'storage/changePageType',
      payload: 'add'
    });
  }

  onDetails = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storage/getStorageById',
      payload: orderId
    });
    dispatch({
      type: 'storage/addBreadcrumbItem',
      payload: {
        item: ['浏览入库', '/storage/details']
      }
    });
    dispatch({
      type: 'storage/changePageType',
      payload: 'details'
    });
  }

  onModify = (noteNumber) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storage/getStorageById',
      payload: noteNumber
    });
    dispatch({
      type: 'storage/addBreadcrumbItem',
      payload: {
        item: ['编辑入库', '/storage/modify']
      }
    });
    dispatch({
      type: 'storage/changePageType',
      payload: 'modify'
    });
  }

  onDelete = () => {

  }

  render() {
    const { pageType, breadcrumbItems, suppliers, list, storageSingle, productList } = this.props.storage;
    const { noteNumber } = storageSingle;
    return (
      <div>
        <BreadcrumbList breadcrumbItems={breadcrumbItems} />
        {
          pageType == 'show' && (
            <div className={storageContainer}>
              <div className={storageBar}>
                <StorageSearchBar suppliers={suppliers} onSearch={this.onSearch} />
                <Button type="primary" onClick={this.onAdd}>添加</Button>
              </div>
              <StorageList
                list={list}
                onModify={this.onModify}
                onDelete={this.onDelete}
                onDetails={this.onDetails}
              />
            </div>
          )
        }
        {
          pageType == 'add' && (
            <div className={storageContainer}>
              <AddStorage
                number={noteNumber}
                suppliers={suppliers}
                productList={productList} />
            </div>
          )
        }
        {
          pageType == 'modify' && (
            <div className={storageContainer}>
              <ModifyStorage
                number={noteNumber}
                suppliers={suppliers}
                productList={productList}
              />
            </div>
          )
        }
        {
          pageType == 'details' && (
            <div className={storageContainer}>
              <ModifyStorage
                number={noteNumber}
                suppliers={suppliers}
                productList={productList}
                disabled={true}
              />
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { storage: state.storage }
}

export default connect(mapStateToProps)(Storage);
