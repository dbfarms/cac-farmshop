import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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

    const { match } = this.props
    //debugger
    return (
      <div>
        <FarmersList farmers={this.props.farmers} />
        {this.props.children}
        <Switch>
          <Route path={`${match.url}/:farmerId`} component={FarmerShow} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    farmers: state.farmers
  };
}

export default connect(mapStateToProps, { getFarmers })(FarmersPage);
