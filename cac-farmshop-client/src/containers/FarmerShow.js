import React from 'react';
import { connect } from 'react-redux'

//debugger

const FarmerShow = ({farmer}) =>

      <div>
        <h2>Farmer Show Page In Progress</h2>
      </div>

const mapStateToProps = (state, ownProps) => {
  const farmer = state.farmers.find(farmer => farmer.id == ownProps.match.params.farmerId)

  if (farmer) {
    return { farmer }
  } else {
    return { farmer: {} }
  }
}

export default connect(mapStateToProps)(FarmerShow)
