import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
//import { Router, browserHistory } from 'react-router-dom';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store.js'
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.css'; // for dropdown

ReactDOM.render(
  <Provider store={store} >
      <div>
         <App />
      </div>
  </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
//<App /> // was where Router history is...
//<Router history={BrowserRouter} routes={routes} />
/*

<Route path="/login" component={LogInPage} />
          <Route exact path="/" render={() => <div>Home For Now</div>} />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={FarmGoods} />
          <Route exact path="/farm-goods/new" component={NewFarmgoodForm} />
          <Route exact path="/cart" component={Carts} />
          <Route path="*" render={() => <div>Page Not Found</div>} />


*/