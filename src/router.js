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

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={HomePage} >
        <IndexRoute component={IndexPage} />
        <Route path="/orders" component={Orders} />
        <Route path="/storage" component={Storage} />
        <Route path="/resource" component={Resource} />
        <Route path="/settlement" component={Settlement} />
        <Route path="/bills" component={Bills} />
        <Route path="/manage" component={Manage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
