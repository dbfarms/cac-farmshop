import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLineItems } from '../actions/lineitems';
import { removeLineItem } from '../actions/lineitems';
import { Link } from 'react-router-dom';
//import Button from 'material-ui/Button';

class CartCard extends Component {
    constructor(props) {
    super(props)
        this.state = {
            openLineitems: [],
            closedLineitems: [],
            cart: this.props.cart, 
            //currentLineItems: '',
            //oldLineitems: ''
        }
    }

    componentWillMount(){
        if (this.state.lineitems === undefined ) {
            //debugger 
            this.props.getLineItems();
        }
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            lineitems: nextProps.lineitems,
            cart: nextProps.cart 
            //oldLineItems: nextProps.allLineItems 
        })
    }

    deleteItem = (li) => {
        //debugger 
        var lineItemId = Number(li.id)
        //debugger
        this.props.removeLineItem(lineItemId)
    }

    sortLineItems(lineitems){
        var sortedLI = lineitems.sort(function(a, b) {
            return a.id = b.id;
        })
    }

    /*
    setLineItems(lineitems){
        debugger 
        if (lineitems.length > 0 ) {
            this.setState({
                currentLineItems: lineitems[0],
                oldLineItems: lineitems[1]
            })
            /*
            debugger 
            lineitems[0].map(li => {
                debugger 
                if (li.attributes["cart-id"] === Number(this.state.cart.id)) {
                    currentLineItems.push(li)
                } else {
                    oldLineItems.push(li)
                }
            })
        }
    }
    */

    render(){
    
    //debugger 
    var total = 0;
    return (
    <div className="CartsCard">
    <p>{sessionStorage.name}</p>
    <img className="CartImage"  />
    
    {this.state.openLineitems.length > 0 && 
        (this.state.openLineitems.map(li => <span>
            {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
            <button onClick={() => this.deleteItem(li)}>X</button>
        </span>)
    )}
    {this.state.openLineitems.length > 0 &&
        (this.state.openLineitems.forEach(li => total += (li.attributes.farmgood.price * li.attributes.quantity))
    )}

    <label>Total: {total}</label>
    <Link to="/checkout">
        <button>Checkout</button>
    </Link>
    </div>
    
    )}
}


const mapStateToProps = (state) => {
    //debugger 
    return ({
        cart: state.cart,
        openLineitems: state.openLineitems 

    })
  }
  
  export default connect(mapStateToProps, { getLineItems, removeLineItem })(CartCard); // 

/*

*/
