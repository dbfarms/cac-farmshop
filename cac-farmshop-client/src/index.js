import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import { AppLogin } from './AppLogin/AppLogin';
import Login from './containers/Login'
import registerServiceWorker from './registerServiceWorker';
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.css';
import { configureFakeBackend } from './helpers/fake-backend';
configureFakeBackend();

ReactDOM.render(
  <Provider store={store} >
      <div>
        <AppLogin />
      </div>
  </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
//<Login />