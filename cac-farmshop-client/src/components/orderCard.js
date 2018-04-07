import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { closeFarmerOrder } from '../actions/orders';


class OrderCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            order: this.props.order
        }
    }

    markClosed(order_id){
        //debugger
        const farmer_order_id = Number(order_id)
        this.props.closeFarmerOrder(farmer_order_id)
    }

    render(){
        const order = this.state.order[0]
        return(
            order.attributes["farmer-line-items"].map((fli, keyIndex) => {
                //debugger 
                return ( <div key={keyIndex} className="orderCard">
                
                {keyIndex === 0 ? <label>Customer: {fli["customer-user"].email} </label> : <p>-------</p>}
                
                <label>Item: {fli.farmgood.name} - quantity: {fli.quantity}</label>
                <br />
                {keyIndex === order.attributes["farmer-line-items"].length - 1 ? <label>Total: {order.attributes.total} </label> : <p>-------</p>}
                {<button className="farmerOrderStatus" onClick={() => this.markClosed(order.id)}>{order.attributes.status === "open" ? "Close Order" : "Reopen Order"}</button>}
                </div>)
            })
        )
    }
}


const mapStateToProps = (state) => {
    //debugger 
    return ({
        order: state.order
    })
}

export default connect(mapStateToProps, { closeFarmerOrder })(OrderCard);


/*
export const OrderCard = (order) => {
    //debugger 
    return order.order.attributes["farmer-line-items"].map((fli, keyIndex) => {
                //debugger 
        return ( <div key={keyIndex} className="orderCard">
            
            {keyIndex === 0 ? <label>Customer: {fli["customer-user"].email} </label> : <p>-------</p>}
            
            <label>Item: {fli.farmgood.name} - quantity: {fli.quantity}</label>
            <br />
            {keyIndex === order.order.attributes["farmer-line-items"].length - 1 ? <label>Total: {order.order.attributes.total} </label> : <p>-------</p>}
            </div>)
        })
}
*/