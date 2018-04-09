import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { closeFarmerOrder } from '../actions/orders';


class OrderCard extends Component {
    constructor(props) {
        super(props)
        //debugger 

        this.state = {
            order: this.props.orders
        }
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            orders: nextProps.orders
        })
    }

    markClosed(order_id){
        //debugger
        const farmer_order_id = Number(order_id)
        this.props.closeFarmerOrder(farmer_order_id)
    }

    displayFarmerOrder(){
        
        //debugger
        const orders = this.state.orders
        //debugger 
        if (typeof orders === "object" ) {
            return orders.map((order, keyIndex) => { 
                //debugger 
                return order.attributes["farmer-line-items"].map((fli, keyIndex) => {
                    //debugger 
                    return ( 
                        <div key={keyIndex} className="orderCard">
                        {keyIndex === 0 ? <label>Customer: {fli["customer-user"].email} </label> : <p></p>}
                        <label>Item: {fli.farmgood.name} - quantity: {fli.quantity}</label>
                        <br />
                        {keyIndex === order.attributes["farmer-line-items"].length - 1 ? <label>Total: {order.attributes.total} </label> : <p></p>}
                        {keyIndex === order.attributes["farmer-line-items"].length - 1 ? <button className="farmerOrderStatus" onClick={() => this.markClosed(order.id)}>{order.attributes.status === "open" ? "Close Order" : "Reopen Order"}</button> : <p/>}
                        </div>
                    )
                })
            })
        }
    }

    render(){
        //debugger
        //const orders = this.state.order
        //debugger 
        return(
            <div>
            {typeof this.state.order === "object" ?  this.displayFarmerOrder() : console.log("loading")}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    //debugger 
    return ({
        orders: state.orders
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