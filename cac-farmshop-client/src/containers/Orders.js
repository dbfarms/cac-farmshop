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
            debugger 
            return order.attributes.farmgoods.map((fg, keyIndex) => {
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

  
/*



*/