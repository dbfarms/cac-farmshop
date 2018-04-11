import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { closeFarmerOrder } from '../actions/orders';


class OrderCard extends Component {
    constructor(props) {
        super(props)
        //debugger 
        
        this.state = {
            openOrders: this.props.orders,
            closedOrders: this.props.orders //[1]
        }
    }

    componentWillReceiveProps(nextProps){
        debugger 
        this.setState({
            openOrders: nextProps.openOrders,
            closedOrders: nextProps.closedOrders 
        })
    }

    markClosed(order_id){
        //debugger
        const farmer_order_id = Number(order_id)
        this.props.closeFarmerOrder(farmer_order_id)
    }

    displayOpenFarmerOrder(){
        
        debugger
        const openOrders = this.state.openOrders
        
        //debugger 
        if (typeof openOrders === "object" ) {
            return openOrders.map((order, keyIndex) => { 
                debugger 
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


    displayClosedFarmerOrder(){
        
        //debugger
        const closedOrders = this.state.closedOrders
        
        //debugger 
        if (typeof closedOrders === "object" ) {
            return closedOrders.map((order, keyIndex) => { 
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
                {this.displayOpenFarmerOrder()}
                {this.displayClosedFarmerOrder()}
            </div>
        )
    }
}
/*

{typeof this.state.openOrders === "object" ?  this.displayOpenFarmerOrder() : console.log("loading")}
            {typeof this.state.closedOrders === "object" ?  this.displayClosedFarmerOrder() : console.log("loading")}
            
*/

const mapStateToProps = (state) => {
    //debugger 
    if ( state.order.length === 0 ) {
        return ({
            openOrders: state.order,
            closedOrders: state.order
        })
    } else {
        //debugger 
        return ({
            openOrders: state.order[0],
            closedOrders: state.order[1]
        })
    }
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