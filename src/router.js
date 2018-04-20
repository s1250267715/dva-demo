import React from 'react';
import { Provider } from 'mobx-react';
import stores from './models'
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Todo from './routes/Todo';
import Time from './routes/Time';
import Test from './routes/Test';
import Observer from './routes/Observer';

function RouterConfig({ history }) {
  return (
    <Provider {...stores}>
  			<Router history={history}>
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/products" exact component={Products} />
            <Route path="/todo" exact component={Todo} />
            <Route path="/time" exact component={Time} />
            <Route path="/test" exact component={Test} />
            <Route path="/observer" exact component={Observer} />
          </Switch>
        </Router>
    </Provider>
    
  );
}

export default RouterConfig;
