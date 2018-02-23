import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';

import { systemInfo, systemName, userName, loginButton, logupButton, logoutButton } from './index.css';

function SystemInfo({systemUser}) {

  const {isLogin,username} = systemUser;


  return (
    <div className={systemInfo}>
      <div className={systemName}>门窗管理系统</div>
      {
        isLogin?
        (
          <div className={userName}>
            <span>欢迎您{username}</span>
            <span className={logoutButton}>退出</span>
          </div>
        ):
        (
          <div className={userName}>
            <span className={loginButton}>登录</span>
            <span className={logupButton}>注册</span>
          </div>
        )
      }

    </div>
  )
}

function mapStateToProps(state){
  return {systemUser:state.systemUser}
}

export default connect(mapStateToProps)(SystemInfo);
