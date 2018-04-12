import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOpenFarmerOrders } from '../actions/orders';
//import { getFarmerLineItems } from '../actions/lineitems';
import { Link } from 'react-router-dom'
import {OrderCard} from '../components/orderCard';
import { closeFarmerOrder } from '../actions/orders';

class OrdersList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openOrders: [],
            closedOrders: []
        }
    }

    componentWillMount(){
        this.props.getOpenFarmerOrders(sessionStorage.id)
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            openOrders: nextProps.openOrders,
            closedOrders: nextProps.closedOrders 
        })
    }

    //<Link to > </Link>
    displayOpenOrders(orders){
        //debugger 
        if (typeof orders === 'object') {
            //debugger 

            const test = orders.sort((a,b) => {
                return a.id - b.id
            })
            //debugger 

            return orders.map((order, keyIndex) => {
                //debugger 
                return (
                    <div key={keyIndex}>
                    <OrderCard 
                        order={order} 
                        key={keyIndex}
                    />
                    <button className="farmerOrderStatus" onClick={() => this.markClosed(order.id)}>{order.attributes.status === "open" ? "Close Order" : "Reopen Order"}</button> 
                    </div>
                )
            })
        }
    }

    markClosed(order_id){
        //debugger
        const farmer_order_id = Number(order_id)
        this.props.closeFarmerOrder(farmer_order_id)
    }


    render(){
        //debugger 
        const openOrders = this.displayOpenOrders(this.state.openOrders)
        const closedOrders = this.displayOpenOrders(this.state.closedOrders)
        //debugger 
        return (
            <div>
                {
                    <div>
                    <h2>orders:</h2> 
                    
                    {this.state.orders === [] ? <p>loading</p> : <p>loaded</p> }
                    </div>
                }
                <h1>Open Orders</h1>
                {this.state.orders === [] ? <p>loading</p> : <div>loaded {openOrders} </div> }

                <br />
                <h1>Closed Orders</h1>
                {this.state.orders === [] ? <p>loading</p> : <div>{closedOrders} </div> }
            </div>
        )
    }
}

//<OrderCard orders={this.state.orders}/>

const mapStateToProps = (state) => {
    //debugger 
    if ( state.orders.length === 0 ) {
        return ({
            openOrders: state.orders,
            closedOrders: state.orders
        })
    } else {
        return ({
            openOrders: state.orders[0],
            closedOrders: state.orders[1]
        })
    }
}

export default connect(mapStateToProps, { getOpenFarmerOrders, closeFarmerOrder })(OrdersList);

  
/*

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOpenFarmerOrders } from '../actions/orders';
//import { getFarmerLineItems } from '../actions/lineitems';
import { Link } from 'react-router-dom'

class OrdersList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: ''
        }
    }

    componentWillMount(){
        this.props.getOpenFarmerOrders(sessionStorage.id)
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            orders: nextProps.orders 
        })
    }

    //<Link to > </Link>
    displayOpenOrders(orders){
        //debugger 
        if (typeof orders === 'object') {
        return orders.map((order, keyIndex) => {
            //debugger 
            const farmgoods = []
            order.attributes.farmgoods.map((fg, keyIndex) => {
               return ( <div key={keyIndex}>
                
                <label>Item: {fg.name} - quantity </label>
                </div>)
            })
        })
        }
    }

    render(){
        //debugger 
        return (
            <div>
                {
                    <h2>orders: {this.displayOpenOrders(this.state.orders)}</h2>
                }
                {this.state.orders === '' ? <p>loading</p> : <p>loaded {console.log(this.state.orders)} </p> }
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    //debugger 
    return ({
        orders: state.order
    })
}

export default connect(mapStateToProps, { getOpenFarmerOrders })(OrdersList);


//////////////

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { getOpenFarmerOrders } from '../actions/orders';
import { getFarmerLineItems } from '../actions/lineitems';
import { Link } from 'react-router-dom'

class OrdersList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: ''
        }
    }

    componentWillMount(){
        this.props.getFarmerLineItems(sessionStorage.id)
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        if (nextProps.openFarmerLineItems != ''){
            this.setState({
                openFarmerLineItems: nextProps.openFarmerLineItems,
                closedFarmerLineItems: nextProps.closedFarmerLineItems 
            })
        } //else {
            
        //}
    }

    //<Link to > </Link>
    displayOpenOrders(openFarmerLineItems){
        //debugger 
        if (typeof openFarmerLineItems === 'object') {
            
            const farmOrders = openFarmerLineItems.map(fli => fli.attributes["farmer-order"])
            
            for (let i = 0; i < farmOrders.length; i++) {
                const thisFarmOrder = []
                openFarmerLineItems.map((fli, keyIndex) => {
                    //debugger 
                    if (fli.attributes["farmer-order"].order_id === farmOrders[i].order_id) {

                    }
                })
            }
                
            debugger 

            
                return ( <div key={keyIndex}>
                            
                    <label>Item: {fli.attributes.farmgood.name} - quantity </label>
                    </div>)
        }
    }

    render(){
        //debugger 
        return (
            <div>
                {
                    <h2>orders: {this.displayOpenOrders(this.state.openFarmerLineItems)}</h2>
                }
                {this.state.orders === '' ? <p>loading</p> : <p>loaded {console.log(this.state.orders)} </p> }
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    //debugger 
    if (state.farmerLineItems.length > 0){
        return ({
            openFarmerLineItems: state.farmerLineItems[0],
            closedFarmerLIneItems: state.farmerLineItems[1]
        })
    } else {
        return ({
            openFarmerLineItems: '',
            closedFarmerLineItems: ''
        })
    }
}

export default connect(mapStateToProps, { getFarmerLineItems })(OrdersList);

  

*/