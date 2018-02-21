import React from 'react';  
import { Route, BrowserRouter } from 'react-router-dom';  
import App from './containers/App';  
//import HomePage from './components/home/HomePage';   //NEED TO MAKE A HOMEPAGE...
//import AboutPage from './components/about/AboutPage';  //NEED ABOUT PAGE TOO
import LogInPage from './components/LogInPage';
import FarmGoods from './containers/FarmGoods';
import FarmersPage from './containers/FarmersPage';
import FarmerShow from './containers/FarmerShow';
import Carts from './containers/carts'
import NewFarmgoodForm from './containers/NewFarmgoodForm';


//<IndexRoute component={HomePage} /> /// NEED TO ADD 
export default (  
  <BrowserRouter >
  <Route path="/" component={App}>
    
    <Route exact path='/farmers' component={FarmersPage} />
    <Route path="/login" component={LogInPage} />
    <Route exact path="/farm-goods" component={FarmGoods} />
    <Route path="/farm-goods/new" component={NewFarmgoodForm} 
        onEnter={requireAuth}>
    </Route>
    <Route exact path="/cart" component={Carts} />
  </Route>
  </BrowserRouter>
);

function requireAuth(nextState, replace) {  
    if (!sessionStorage.jwt) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

/*

<Route path="/login" component={LogInPage} />
          <Route exact path="/" render={() => <div>Home For Now</div>} />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={FarmGoods} />
          <Route exact path="/farm-goods/new" component={NewFarmgoodForm} />
          <Route exact path="/cart" component={Carts} />
          <Route path="*" render={() => <div>Page Not Found</div>} />


*/