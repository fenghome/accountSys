import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import HomePage from './routes/HomePage/HomePage';
import IndexPage from './routes/IndexPage/IndexPage';
import Orders from './routes/Orders/Orders';
import Storage from './routes/Storage/Storage';
import Resource from './routes/Resource/Resource';
import Settlement from './routes/Settlement/Settlement';
import Bills from './routes/Bills/Bills';
import Manage from './routes/Manage/Manage';
import CustomerBills from './routes/CustomerBills/CustomerBills';
import SupplierBills from './routes/SupplierBills/SupplierBills';
import Customers from './routes/Customers/Customers';
import Products from './routes/Products/Products';
import Suppliers from './routes/Suppliers/Suppliers';
import { requireAuth } from './utils/webSessionUtils';
import Test from './routes/Test/Test';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={HomePage} >
        <Route path="/index" component={IndexPage} />
        <Route path="/orders" onEnter={requireAuth} component={Orders} />
        <Route path="/storage" onEnter={requireAuth} component={Storage} />
        <Route path="/resource" onEnter={requireAuth} component={Resource} />
        <Route path="/settlement" onEnter={requireAuth} component={Settlement} />
        <Route path="/bills" onEnter={requireAuth} component={Bills} />
        <Route component={Bills}>
          <Route onEnter={requireAuth} path="/customerBills" component={CustomerBills} />
          <Route onEnter={requireAuth} path="/supplierBills" component={SupplierBills} />
        </Route>
        <Route onEnter={requireAuth} path="/manage" component={Manage} />
        <Route component={Manage}>
          <Route onEnter={requireAuth} path="/customer" component={Customers} />
          <Route onEnter={requireAuth} path="/product" component={Products} />
          <Route onEnter={requireAuth} path="/supplier" component={Suppliers} />
        </Route>
        <Route path="/test" component={Test} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
