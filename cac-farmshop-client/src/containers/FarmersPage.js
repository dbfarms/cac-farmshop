/*
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router';
//import { connect } from 'react-redux';
//import { bindActionCreators}  from 'redux';
//import { getFarmers } from '../actions/farmers'; //
import FarmersList from '../components/FarmersList'; //
import FarmerShow from './FarmerShow';
import NoMatch from '../components/NoMatch';

export default class FarmersPage extends Component {


  render() {

    //debugger
    const { match } = this.props
    //debugger
    return (
      <div>
        <h3>Farmers</h3>
        <Route path={`${match.url}/:productId`}
            render={() => {<h3> i'm rendering</h3>}}/>
        <Route exact path={match.url}
            render={() => <FarmersList />}
        />
      </div>
    )
  }
}
/*
        <Switch>
          <Route path={`${match.path}/:name`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
          <Route exact path={`${match.path}/:farmerId`} component={FarmerShow} />
          <Route 
            path={match.url} component={FarmersList} />
          <Route component={NoMatch}/>
        </Switch>
        <Route path={`${match.path}/:name`} render= {({match}) =>( <div> <h3> testest </h3></div>)}/>


//<FarmersList farmers={this.props.farmers} />
// <Route path="/:name" component={FarmerShow} />

const mapStateToProps = (state) => {
  return {
    farmers: state.farmers
  };
}

//export default connect(mapStateToProps, { getFarmers })(FarmersPage);
*/