import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators}  from 'redux';
import { getFarmers } from '../actions/farmers'; //
import FarmersList from '../components/FarmersList'; //

class FarmersPage extends Component {
  render() {
    return (
      <div>
        <FarmersList farmers={this.props.farmers} />
        {this.props.children}
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
