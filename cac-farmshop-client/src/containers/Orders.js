
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOpenFarmerOrders } from '../actions/orders';
//import { getFarmerLineItems } from '../actions/lineitems';
import { Link } from 'react-router-dom'
import OrderCard from '../components/orderCard';

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
            debugger 
            return orders.map((order, keyIndex) => {
                //debugger 
                //const farmgoods = []
                return (
                <div key={keyIndex}>
                 <OrderCard order={order} />
                </div>
                )
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
    debugger 
    return ({
        orders: state.order
    })
}

export default connect(mapStateToProps, { getOpenFarmerOrders })(OrdersList);

  
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