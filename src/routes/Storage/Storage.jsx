import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd';

import BreadList from '../../components/BreadList/BradList';
import StorageSearchBar from '../../components/Storage/StorageSearchBar/StorageSearchBar';
import StorageList from '../../components/Storage/StorageList/Storagelist';
import AddStorage from '../../components/Storage/AddStorage/AddStorage';
import ModifyStorage from '../../components/Storage/ModifyStorage/ModifyStorage';
import { storageContainer, storageBar } from './index.css';

class Storage extends Component {

  componentWillReceiveProps(nextProps) {
    const { msg } = nextProps.storage;
    if (msg) {
      message.info(msg);
      this.props.dispatch({
        type: 'storage/setMessage',
        payload: ''
      })
    }
  }

  onSearch = (values) => {
    //取得values对orders的数据进行筛选
    console.log(values);
  }

  onAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storage/changePageType',
      payload: 'add'
    });
    dispatch({
      type: 'storage/addStorage'
    })
  }

  onDetails = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'storage/getStorageById',
      payload: orderId
    });
    dispatch({
      type: 'storage/changePageType',
      payload: 'details'
    });
  }



  render() {
    const { pageType, breadcrumbItems, suppliers, list, storageSingle, productList } = this.props.storage;
    const { noteNumber } = storageSingle;
    return (
      <div>
        <BreadList />
        {
          pageType == 'show' && (
            <div className={storageContainer}>
              <div className={storageBar}>
                <StorageSearchBar />
                <Button type="primary" onClick={this.onAdd}>添加</Button>
              </div>
              <StorageList />
            </div>
          )
        }
        {
          pageType != 'show' && (
            <div className={storageContainer}>
              <AddStorage />
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
