import React from 'react';
import {Link} from 'dva/router';
import { Menu, Icon, Button } from 'antd';

import { header, menuList, link } from './index.css';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default class Header extends React.Component {

  menus = [
    ['index', '首页', '/index', 'home'],
    ['orders', '订单', '/orders', 'solution'],
    ['storage', '入库', '/storage', 'database'],
    ['resource', '物资', '/resource', 'layout'],
    ['settlement', '结算', '/settlement', 'profile'],
    ['bills', '对账', '/bills', 'bank',
      [
        ['customerBills', '客户对账', '/customerBills', 'user-add'],
        ['supplierBills', '供应商对账', '/supplierBills', 'usergroup-add']
      ]
    ],
    ['mange', '管理', '/mange', 'setting',
      [
        ['customer', '客户', '/customer', 'user'],
        ['product', '商品', '/product', 'inbox'],
        ['supplier', '供应商', '/supplier', 'team']
      ]
    ],
  ]

  constructor(props) {
		super(props);
		this.state = {
			activeKeys: 'index'
		};
  }

  componentWillMount(){
    const {pathname} = this.props.location;
    const activeKeys = pathname.slice(1) || 'index';
    this.setState({
      activeKeys
    })
  }

  componentWillReceiveProps(nextProps){
    const {pathname} = nextProps.location;
    const activeKeys = pathname.slice(1) || 'index';
    this.setState({
      activeKeys
    })
  }


  render() {
    const {activeKeys} = this.state;
    return (
      <div className={header}>
        <Menu
          defaultSelectedKeys={[activeKeys]}
          selectedKeys={[activeKeys]}
          mode="inline"
          theme="dark"
          className={menuList}
        >
          {
            this.menus.map(([key, text, path, icon, subItem]) => {
              if (subItem) {
                return (
                  <SubMenu key={key} title={<span><Icon type={icon} /><span>{text}</span></span>}>
                    {
                      subItem.map(([key, text, path, icon]) => (
                        <MenuItem key={key}>
                          <Link to={path} className={link}>
                            {<span><Icon type={icon} /><span>{text}</span></span>}
                          </Link>
                        </MenuItem>
                      ))
                    }
                  </SubMenu>
                )
              } else {
                return (
                  <MenuItem key={key}>
                    <Link to={path} className={link}>
                      {<span><Icon type={icon} /><span>{text}</span></span>}
                    </Link>
                  </MenuItem>
                )
              }
            })
          }
        </Menu>
      </div>

    )
  }

}


