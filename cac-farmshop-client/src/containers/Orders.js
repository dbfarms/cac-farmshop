import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFarmerOrders } from '../actions/lineitems';
import { Link } from 'react-router-dom'

class OrdersList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: ''
        }
    }

    componentWillMount(){
        this.props.getFarmerOrders(sessionStorage.id)
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            orders: nextProps.orders 
        })
    }

    displayOpenOrders(orders){
        //debugger 
        if (typeof orders === 'object') {
        return orders.map((order, keyIndex) => {
            return (
                <div key={keyIndex}>
                <Link to > </Link>
                <label>name: {order[0].name}</label>
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
                    <p>orders: {this.displayOpenOrders(this.state.orders)}</p>
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

export default connect(mapStateToProps, { getFarmerOrders })(OrdersList);

  