import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOpenLineItems } from '../actions/lineitems';
import { removeLineItem } from '../actions/lineitems';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
//import Button from 'material-ui/Button';

class CartCard extends Component {
    constructor(props){
        super(props)
        
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            openLineitems: [],
            cart: this.props.cart, 
        };
    }

    componentWillMount(){
        this.props.getOpenLineItems();
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            openLineitems: nextProps.openLineitems,
            cart: nextProps.cart 
            //oldLineItems: nextProps.allLineItems 
        })
    }

    deleteItem = (li) => {
        //debugger 
        const lineItemId = Number(li.id)
        const initialQuantity = li.attributes.quantity
        //debugger
        this.props.removeLineItem(lineItemId, initialQuantity)
    }

    sortLineItems(lineitems){
        var sortedLI = lineitems.sort(function(a, b) {
            return a.id = b.id;
        })
    }

    toggle(){
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    makeCart() {
        //debugger 
        if (this.state.openLineitems.length > 0 ) {
            //debugger
            return this.state.openLineitems.map(fg => {
                return (
                    <div>
                    <DropdownItem >
                        {fg.attributes.farmgood.name} 
                        - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                        <button 
                            float="right" 
                            onClick={() => {this.deleteItem(fg)
                        }}>X</button></DropdownItem> 
                    </div>
                )
            })
        }
        
    }

    render(){
    
    //debugger 
    var total = 0;
    if (this.state.openLineitems.length > 0) {
        this.state.openLineitems.forEach(lineItem => total += (lineItem.attributes.farmgood.price * lineItem.attributes.quantity))
    } 
    
    return (
        <Dropdown className="dropdowntext" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Cart
            </DropdownToggle>
            <DropdownMenu>
                {this.makeCart()}
                <DropdownItem divider />
                <DropdownItem header>Total: {total}</DropdownItem>
                <DropdownItem divider />
                <Link to="/checkout">
                    <button>Checkout</button>
                </Link>
            </DropdownMenu>
        </Dropdown>
    )}
}


const mapStateToProps = (state) => {
    //debugger 
    return ({
        cart: state.cart,
        openLineitems: state.openLineitems 

    })
  }
  
  export default connect(mapStateToProps, { getOpenLineItems, removeLineItem })(CartCard); // 

/*
<DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Monday')
                    }}>Monday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Tuesday')
                    }}>Tuesday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Wednesday')
                    }}>Wednesday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Thursday')
                    }}>Thursday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Friday')
                    }}>Friday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Saturday')
                    }}>Saturday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Sunday')
                    }}>Sunday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('show all')
                    this.props.changeDay('Any Day')
                    }}>Show All</DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>By Category</DropdownItem>
                <DropdownItem onClick={() => {
                    this.props.changeShow('category')
                    this.props.changeCategory('Vegetables/Fruit')
                    }}>Fruit & Vegetables</DropdownItem>
                <DropdownItem onClick={() => {
                    this.props.changeShow('category')
                    this.props.changeCategory('Meat')
                    }}>Meat</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('category')
                    this.props.changeCategory('Dairy')
                    }}>Dairy</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('category')
                    this.props.changeCategory('Eggs')
                    }}>Eggs</DropdownItem>


///

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOpenLineItems } from '../actions/lineitems';
import { removeLineItem } from '../actions/lineitems';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
//import Button from 'material-ui/Button';

class CartCard extends Component {

    render(){
    
    //debugger 
    var total = 0;
    return (
        <div>
            <MediaQuery query="(max-width: 635px)" >
                <div className="cartcard-small">
                    <p>{sessionStorage.name}</p>
                    
                    <label>Total: {total}</label>
                    <Link to="/checkout">
                        <button>Checkout</button>
                    </Link>
                </div>
            </MediaQuery>
            <MediaQuery query="(min-width: 636px)" >
                <MediaQuery query="(max-width: 1294px)">
                    <div className="cartcard-med">
                        <p>{sessionStorage.name}</p>
                        <img className="CartImage"  />
                        
                        <p> need to redesign, maybe allow for adding fgs and then sign in when checking out? would mean i should make a new cart for each new session?</p>

                        <label>Total: {total}</label>
                        <Link to="/checkout">
                            <button>Checkout</button>
                        </Link>
                    </div>
                </MediaQuery>
                <MediaQuery query="(min-width: 1295px)" >
                    <div className="cartcard-large">
                        <p>{sessionStorage.name}</p>
                        <img className="CartImage"  />
                        
                        <p> need to redesign, maybe allow for adding fgs and then sign in when checking out? would mean i should make a new cart for each new session?</p>

                        <label>Total: {total}</label>
                        <Link to="/checkout">
                            <button>Checkout</button>
                        </Link>
                    </div>                    
                </MediaQuery>
            </MediaQuery>
        </div>
    )}
}


const mapStateToProps = (state) => {
    //debugger 
    return ({
        cart: state.cart,
        openLineitems: state.openLineitems 

    })
  }
  
  export default connect(mapStateToProps, { getOpenLineItems, removeLineItem })(CartCard); // 

*/


/*

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOpenLineItems } from '../actions/lineitems';
import { removeLineItem } from '../actions/lineitems';
import { Link } from 'react-router-dom';
//import Button from 'material-ui/Button';

class CartCard extends Component {
    constructor(props) {
    super(props)
        this.state = {
            openLineitems: [],
            //closedLineitems: [],
            cart: this.props.cart, 
            //currentLineItems: '',
            //oldLineitems: ''
        }
    }

    componentWillMount(){
        //if (this.state.lineitems === undefined ) {
            //debugger 
            this.props.getOpenLineItems();
        //}
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            openLineitems: nextProps.openLineitems,
            cart: nextProps.cart 
            //oldLineItems: nextProps.allLineItems 
        })
    }

    deleteItem = (li) => {
        //debugger 
        const lineItemId = Number(li.id)
        const initialQuantity = li.attributes.quantity
        //debugger
        this.props.removeLineItem(lineItemId, initialQuantity)
    }

    sortLineItems(lineitems){
        var sortedLI = lineitems.sort(function(a, b) {
            return a.id = b.id;
        })
    }

    /*
    setLineItems(lineitems){
        debugger 
        if (lineitems.length > 0 ) {
            this.setState({
                currentLineItems: lineitems[0],
                oldLineItems: lineitems[1]
            })
            /*
            debugger 
            lineitems[0].map(li => {
                debugger 
                if (li.attributes["cart-id"] === Number(this.state.cart.id)) {
                    currentLineItems.push(li)
                } else {
                    oldLineItems.push(li)
                }
            })
        }
    }
    *//*

   render(){
    
    //debugger 
    var total = 0;
    return (
        <div className="CartsCard">
            <p>{sessionStorage.name}</p>
            <img className="CartImage"  />
            
            {this.state.openLineitems.length > 0 && 
                <ul>
                {this.state.openLineitems.map((lineItem, keyIndex) => {
                    return (
                        <li className="cartLine">
                            <span key={keyIndex}>
                                {lineItem.attributes.farmgood.name} - {lineItem.attributes.quantity} at ${lineItem.attributes.farmgood.price}
                                <button onClick={() => this.deleteItem(lineItem)}>X</button>
                            </span> 
                        </li>
                    )})
                }
                </ul>
            }
            {this.state.openLineitems.length > 0 &&
                (this.state.openLineitems.forEach(lineItem => total += (lineItem.attributes.farmgood.price * lineItem.attributes.quantity))
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
        cart: state.cart,
        openLineitems: state.openLineitems 

    })
  }
  
  export default connect(mapStateToProps, { getOpenLineItems, removeLineItem })(CartCard); // 



*/
