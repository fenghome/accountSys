import React from 'react';
import { Button } from 'antd';
import Header from '../../components/Header/Header';
import { homePage, container, left, right } from './index.css';
export default class IndexPage extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <div className={homePage}>
        <Header />
        <div className={container}>
          {children}
        </div>
      </div>
    )
  }
}
