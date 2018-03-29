import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClosedLineItems } from '../actions/lineitems';


class HistoryOrder extends Component{
    constructor(props) {
        super(props)

        this.state = {
            //openLineitems: this.props.openLineitems,
            closedLineitems: this.props.closedLineitems
        }
    }

    /*
    componentWillMount(){
        //this.props.getClosedLineItems(sessionStorage.id)
    }

    componentWillReceiveProps(nextProps){
        debugger 
        this.setState({
            closedLineitems: nextProps.closedLineitems
        })
    }
    */

    renderOldLineItems = (oldlineitems) => {
        //debugger 
        return <div align="center" className="CartsContaine">
          {oldlineitems.map((li, keyIndex) => {
          //debugger
          return <span key={keyIndex}>link to: {li.attributes.farmgood.name}</span>
        })}
        </div>
    }

    render(){
        //debugger 
        const closedLineitemList = this.props.closedLineitems
        return(
            <div>
                {closedLineitemList != undefined ? this.renderOldLineItems(closedLineitemList) : "loading" }
            </div>
        )
    }
}

/*
const mapStateToProps = (state, ownProps) => {
    //debugger 
    return ({
        //cart: state.cart,
        closedLineitems: state.closedLineitems 

    })
  }
*/
  
export default HistoryOrder//connect(mapStateToProps, { getClosedLineItems})(HistoryOrder); // 
