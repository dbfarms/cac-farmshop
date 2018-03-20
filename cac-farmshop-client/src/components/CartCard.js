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
            lineitems: this.props.lineitems
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
            lineitems: nextProps.lineitems
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

    render(){
    const lineitems = this.state.lineitems
    var total = 0;
    return (
    <div className="CartsCard">
    <h3>{sessionStorage.name}</h3>
    <img className="CartImage"  />
    
    {lineitems !== "" && 
        (lineitems.map(li => <p>
            {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
            <button onClick={() => this.deleteItem(li)}>X</button>
        </p>)
    )}
    {lineitems !== "" &&
        (lineitems.forEach(li => total += (li.attributes.farmgood.price * li.attributes.quantity))
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
        //cart: state.cart
        lineitems: state.lineitems 
    })
  }
  
  export default connect(mapStateToProps, { getLineItems, removeLineItem })(CartCard); // 

/*

    {lineitems.cart !== "" &&
        (lineitems.cart.map(li => <p>
            {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
            <button onClick={this.deleteItem}>X</button>
        </p>)
    )}
    {lineitems.cart !== "" &&
        (lineitems.cart.forEach(li => total += li.attributes.farmgood.price)
    )}


//
const CartCard = ( lineitems ) => {
    //debugger
    var total = 0;
    return (
    <div className="CartsCard">
    <h3>{sessionStorage.name}</h3>
    <img className="CartImage"  />
    {lineitems.cart !== "" &&
        (lineitems.cart.map(li => <p>
            {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
            <button onClick={this.deleteItem}>X</button>
        </p>)
    )}
    {lineitems.cart !== "" &&
        (lineitems.cart.forEach(li => total += li.attributes.farmgood.price)
    )}
    <label>Total: {total}</label>
    </div>
    
)}



export default CartCard


/*

<div className="CartsCard">
    <h3>{sessionStorage.name}</h3>
    <img className="CartImage"  />
    {lineitems !== [] &&
        (lineitems.map(li => <p>{li.attributes.farmgood.name} - {li.attributes.quantity} at </p>))
    }
    
</div>

src={lineitems.img_url} alt={cart.user_id}


const listLineItems = ({lineitems}) => {
    return (lineitems.map(li => <p>{li.attributes.farmgood.name} - {li.attributes.quantity} at </p>))
}
*/
