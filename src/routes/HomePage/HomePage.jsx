import React from 'react';
import { Button } from 'antd';
import Header from '../../components/Header/Header';
import { homePage, container, left, right } from './index.css';
export default class IndexPage extends React.Component {

  render() {
    const { children,location } = this.props;
    return (
      <div className={homePage}>
        <Header location={location}/>
        <div className={container}>
          {children}
        </div>
      </div>
    )
  }
}
