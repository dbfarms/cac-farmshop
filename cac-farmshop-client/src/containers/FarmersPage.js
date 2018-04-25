import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
//import { bindActionCreators}  from 'redux';
import { getFarmers } from '../actions/farmers'; //
import FarmersList from '../components/FarmersList'; //
import FarmerShow from './FarmerShow';

class FarmersPage extends Component {

  componentDidMount(){
    this.props.getFarmers();
  }

  render() {


    //debugger
    const { match } = this.props
    //debugger
    return (
      <div>
       
        <Switch>
        
        <Route path={`${match.url}`} component={FarmersList(this.props.farmers)} />
        <Route path={`${match.url}/:farmerId`} component={FarmerShow} />
          
        </Switch>
        
      </div>
    )
  }
}
//<FarmersList farmers={this.props.farmers} />
// <Route path="/:name" component={FarmerShow} />

const mapStateToProps = (state) => {
  return {
    farmers: state.farmers
  };
}

export default connect(mapStateToProps, { getFarmers })(FarmersPage);
