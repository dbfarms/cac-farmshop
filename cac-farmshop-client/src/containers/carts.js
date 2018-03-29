import React, { Component } from 'react';
import { connect } from 'react-redux';
//import CartCard from '../components/CartCard';
import CartCardModal from '../components/CartCardModal';
import { getAllLineItems } from '../actions/lineitems';
import HistoryOrders from '../components/HistoryOrders';

import './Carts.css';

class Cart extends Component {
  constructor(props){
    super(props)
    //debugger 

    this.state = {
      user_id: sessionStorage.id, 
      user_name: sessionStorage.name,
      //lineitems: undefined 
      
      openLineitems: [],//this.props.openLineitems,
      closedLineitems: [], //this.props.closedLineitems,
      cart: this.props.cart 
      
    }
  }

  componentDidMount(){
    this.props.getAllLineItems(sessionStorage.id)
  }

  componentWillReceiveProps(nextProps){
    //debugger
    if (nextProps.openLineitems.length > 0 ) {
      this.setState({
        openLineitems: nextProps.openLineitems[0],
        closedLineitems: nextProps.closedLineitems[1] 
      })
    } 
  }

  render() {
    //const closedLineitems = this.state.closedLineitems
    //const openLineItems = this.state.openLineitems
    //debugger 
    
    return (
      <div>
      {JSON.stringify(this.state.openLineitems) === "[]" &&
        <div>
          <p>loading</p>
        </div> 
      }
      {JSON.stringify(this.state.openLineitems) !== "[]" &&
        <div className="CartsContainer">
          <div align="left">
            <h1>Cart </h1>
            <CartCardModal openLineitems={this.state.openLineitems}/>
          </div>
        </div>
      }
      {this.state.closedLineitems === [] &&
        <div>
          <p>loading</p>
        </div> 
      }
      {this.state.closedLineitems !== [] &&
        <div align="right">
          <h3>old orders / what you ate in the past</h3>
          <HistoryOrders closedLineitems={this.state.closedLineitems}/>
          
        </div>
      }
      </div>
   )
  }
}

//{this.renderOldLineItems(oldlineitems)}

const mapStateToProps = (state) => {
  //debugger 
  return ({
      openLineitems: state.openLineitems,
      closedLineitems: state.closedLineitems
  })
}


export default connect(mapStateToProps, { getAllLineItems })(Cart);


/*

{this.state.lineitems === undefined &&
        <div>
          <p>loading</p>
        </div>
      }

if (lineitems != undefined ) {
        //debugger 
        lineitems.map(li => {
            debugger 
            if (li.attributes["cart-id"] === Number(this.state.cart.id)) {
                currentLineItems.push(li)
            } else {
                oldLineItems.push(li)
            }
        })
    }

*/