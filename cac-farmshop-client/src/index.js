import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import Login from './containers/Login'
import registerServiceWorker from './registerServiceWorker';
import store from './store.js'

ReactDOM.render(
  <Provider store={store} >
      <div>
        <Login />
        <App />
      </div>
  </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
