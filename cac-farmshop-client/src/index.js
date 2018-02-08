import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store.js'
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
//import { Switch, Route } from 'react-router-dom'
//import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import FarmersPage from './containers/FarmersPage';
import FarmerShow from './containers/FarmerShow';


ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter >
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path='/farmers' component={FarmersPage} >
            <Route path="/farmers/:id" component={FarmerShow} />
          </Route>
          
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
