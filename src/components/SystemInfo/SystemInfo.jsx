import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal } from 'antd';
import LogupModal from '../LogupModal/LogupModal';
import LoginModal from '../LoginModal/LoginModal';

import { systemInfo, systemName, userName, loginButton, logupButton, logoutButton } from './index.css';

function SystemInfo({ dispatch, systemUser }) {

  const { isLogin, username, logupModalVisible, loginModalVisible, logupErrMsg, loginErrMsg } = systemUser;

  function showLogupModal() {
    dispatch({
      type: 'systemUser/showLogupModal'
    })
  }

  function hideLogupModal() {
    dispatch({
      type: 'systemUser/hideLogupModal'
    })
  }

  function showLoginModal() {
    dispatch({
      type: 'systemUser/showLoginModal'
    })
  }

  function hideLoginModal() {
    dispatch({
      type: 'systemUser/hideLoginModal'
    })
  }

  function doLogup(userInfo) {
    dispatch({
      type: 'systemUser/doLogup',
      payload: userInfo
    });
  }

  function doLogin(userInfo) {
    dispatch({
      type: 'systemUser/doLogin',
      payload: userInfo
    });
  }

  function doLogout() {
    dispatch({
      type: 'systemUser/doLogout'
    });
    dispatch(routerRedux.push('/index'));
  }

  return (
    <div className={systemInfo}>
      <div className={systemName}>门窗管理系统</div>
      {
        isLogin ?
          (
            <div>
              <span className={userName}>欢迎您{username}</span>
              <span className={logoutButton} onClick={doLogout}>退出</span>
            </div>
          ) :
          (
            <div>
              <span className={loginButton} onClick={showLoginModal}>登录</span>
              <span className={logupButton} onClick={showLogupModal}>注册</span>
            </div>
          )
      }
      <LogupModal
        visible={logupModalVisible}
        errMsg={logupErrMsg}
        onConfirm={doLogup}
        onCancel={hideLogupModal}
      />
      <LoginModal
        visible={loginModalVisible}
        errMsg={loginErrMsg}
        onConfirm={doLogin}
        onCancel={hideLoginModal}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return { systemUser: state.systemUser }
}

export default connect(mapStateToProps)(SystemInfo);
