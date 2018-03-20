import React, { Component } from 'react';
import { connect } from 'react-redux'
import CartCard from '../components/CartCard';
import { getLineItems } from '../actions/lineitems'
import './Carts.css';

class Cart extends Component {
  constructor(props){
    super(props)
    //debugger 

    this.state = {
      user_id: sessionStorage.id, 
      user_name: sessionStorage.name,
      lineitems: undefined 
    }
  }

  componentDidMount(){
    this.props.getLineItems(sessionStorage.id)
  }

  componentWillReceiveProps(nextProps){
    //debugger
    this.setState({
      lineitems: nextProps.lineitems //[0] 
    })
  }

  render() {
    //debugger 
    return (
      <div>
      {this.state.lineitems === undefined &&
        <div>
          <p>loading</p>
        </div>
      }
      {this.state.lineitems != undefined &&
      <div className="CartsContainer">
        <h1>Cart </h1>
        <CartCard  cart={this.state.lineitems} />
      </div>
      }
      </div>
   )
  }
}

const mapStateToProps = (state) => {
  //debugger 
  return ({
      lineitems: state.lineitems
  })
}

export default connect(mapStateToProps, { getLineItems })(Cart);
