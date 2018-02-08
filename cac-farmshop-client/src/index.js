import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store.js'
//import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
//import { Switch, Route } from 'react-router-dom'
//import { Router, Route, IndexRoute, browserHistory } from 'react-router';



ReactDOM.render(
  <Provider store={store} >
      <div>
        <App />
      </div>
  </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
