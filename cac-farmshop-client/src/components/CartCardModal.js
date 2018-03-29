import React, { Component } from 'react'
import { Link } from 'react-router-dom';  
import { connect } from 'react-redux';
import { removeLineItem } from '../actions/lineitems';

class CartCardModal extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            currentLineItems: this.props.openLineitems[0]
        }
    }

    totalCost = (currentLineItems) =>{
        //debugger 
        var total = 0
    
        if (this.state.currentLineItems !== undefined || this.state.currentLineItems !== [] ){
            this.state.currentLineItems.forEach(li => {
                total += (li.attributes.farmgood.price * li.attributes.quantity)
            })
        }
        return total
    }

    deleteItem = (li) => {
        debugger 
        const lineItemId = Number(li.id)
        const initialQuantity = li.attributes.quantity
        //debugger
        this.props.removeLineItem(lineItemId, initialQuantity)
    }


    render(){
        //debugger 
        return(
            <div className="CartsCard">
            <p>{sessionStorage.name}</p>
            <img className="CartImage"  />
            {this.state.currentLineItems !== [] && 
                
                (this.state.currentLineItems.map(li => <p>
                    {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
                    <button onClick={() => this.deleteItem(li)}>X</button>
                </p>)
            )}
            {this.state.currentLineItems !== [] &&
                <p>Total: {this.totalCost(this.state.currentLineItems)}</p>
            }
    
            <Link to="/checkout">
                <button>Checkout</button>
            </Link>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    //debugger 
    return ({
        //cart: state.cart,
        openLineitems: state.openLineitems 

    })
  }

export default connect(mapStateToProps, { removeLineItem })(CartCardModal)


/*

const totalCost = (currentLineItems) =>{
//debugger 
    var total = 0

    if (currentLineItems !== undefined || currentLineItems.openLineitems !== [] ){
        currentLineItems.openLineitems.forEach(li => {
            total += (li.attributes.farmgood.price * li.attributes.quantity)
        })
    }
    return total
}

const CartCardModal = (currentLineItems, total=0) => 
    //debugger
    <div className="CartsCard">
        <p>{sessionStorage.name}</p>
        <img className="CartImage"  />
        <p>{console.log(currentLineItems)}</p>
        {currentLineItems.openLineitems !== [] && 
            
            (currentLineItems.openLineitems.map(li => <p>
                {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
                <button onClick={() => this.deleteItem(li)}>X</button>
            </p>)
        )}
        {currentLineItems !== [] &&
            <p>Total: {totalCost(currentLineItems)}</p>
        }

        <Link to="/checkout">
            <button>Checkout</button>
        </Link>
    </div>
    

export default CartCardModal
*/

/*
<label>Total: {totalCost()}</label>


{debugger} ) /*
            --


<div className="CartsCard">
        <p>{sessionStorage.name}</p>
        <img className="CartImage"  />

        {currentLineItems !== [] && 
            (currentLineItems.map(li => <p>
                {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
                <button onClick={() => this.deleteItem(li)}>X</button>
            </p>)
        )}
        {currentLineItems !== "" &&
            (currentLineItems.forEach(li => total += (li.attributes.farmgood.price * li.attributes.quantity))
        )}

        <label>Total: {total}</label>
        <Link to="/checkout">
            <button>Checkout</button>
        </Link>
    </div>

*/