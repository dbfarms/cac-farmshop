import React from 'react'
import { getOpenLineItems } from '../actions/lineitems';
import {connect} from 'react-redux';  
import CartCardDDModal from './CartCardDDModal'

class CartCardDropDown extends React.Component {
  constructor(props) {
    super(props)

    //debugger 

    var addSubtractArray = []
    var i;
    for (i = 0; i < this.props.openLineitems.length; i++) {
        addSubtractArray.push(false)
    }
      

    this.state = {
      openLineitems: this.props.openLineitems,
      showAddSubtract: addSubtractArray
      //total: 0
    }
  }

  handleHover(keyIndex){ //keyIndex
    //debugger 
   const updatedAddSubtract = Object.assign([], this.state.showAddSubtract)
   updatedAddSubtract[keyIndex] = !updatedAddSubtract[keyIndex]
   //debugger 
   //console.log(this.state.showAddSubtract) 
    this.setState({
        //showAddSubtract: !this.state.showAddSubtract
        showAddSubtract: updatedAddSubtract
    })

//debugger 
   // this.setState({
     //   showAddSubtract: this.state.showAddSubtract[keyIndex] = !this.state.showAddSubtract[keyIndex]
    //})
  }

  setCartAddSubtract(){
      //debugger 
      
      var addSubtractArray = []
      var i;
      for (i = 0; i < this.state.openLineitems.length; i++) {
        addSubtractArray.push(false)
      }
      
      var equalArrays = true;
      //debugger 
      addSubtractArray.forEach((value, index) => {
          if (value !== this.state.showAddSubtract[index]) {
            equalArrays = false 
          }
      })

      if (equalArrays == false ) {
        //debugger 
        this.setState({
            showAddSubtract: addSubtractArray
        })
      }
  }

  /*
  componentWillMount(){
    const cartListMenu = this.cartList()
    
    this.setState({cartListMenu: cartListMenu});
  }
    /*
    var addSubtractArray = []
    var i;
    for (i = 0; i < this.props.openLineitems.length; i++) {
      addSubtractArray.push(false)
    }
    
    var equalArrays = true;
    //debugger 
    addSubtractArray.forEach((value, index) => {
        if (value !== this.state.showAddSubtract[index]) {
          equalArrays = false 
        }
    })
    //debugger 
    if (equalArrays == false ) {
      //debugger 
      this.setState({
          showAddSubtract: addSubtractArray
      })
    } else {
        //debugger 
    }
  }
  */


  componentWillReceiveProps(nextProps){
    //debugger 
    //console.log("next props in carcarddropdown")
    
    if (sessionStorage.id === undefined) {
        this.setState({
            openLineitems: [],
            cart: [],
        })
        //console.log(this.state.openLineitems)
    } else {
        this.setState({
            openLineitems: nextProps.openLineitems,
            cart: nextProps.cart 
            //oldLineItems: nextProps.allLineItems 
        })
    }
  }


  cartList() {
      //debugger 
    var total = 0;
    this.state.openLineitems.forEach(lineItem => total += (lineItem.attributes.farmgood.price * lineItem.attributes.quantity))
    //debugger
    return this.state.openLineitems.map((fg, keyIndex) => {
        //debugger
        return (
            <div key={keyIndex}>
                {keyIndex !== (this.state.openLineitems.length - 1) &&
                    <div 
                        className="nav__submenu-item_cart"
                        //onMouseLeave={this.handleHover(keyIndex)}
                    >   
                    {console.log(this.state.showAddSubtract)}
                        {this.state.showAddSubtract[keyIndex] === false &&
                            <div onMouseEnter={this.handleHover.bind(this, keyIndex)}>
                                {console.log(fg.attributes.farmgood.name)}
                                 {fg.attributes.farmgood.name} 
                            - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                            </div>
                        }
                        {this.state.showAddSubtract[keyIndex] === true &&
                        <div 
                            onMouseLeave={this.handleHover.bind(this, keyIndex)}>
                            <button
                                float="left"
                                className="addSubtractItem"
                                onClick={() => {this.props.addItem(fg)}}
                            >+</button>
                            {fg.attributes.farmgood.name} 
                            - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                            <button 
                                float="right" 
                                className="addSubtractItem"
                                onClick={() => {this.props.deleteItem(fg)}}
                            >-</button>
                        </div>
                        }
                        
                    </div>
                }
                {keyIndex === (this.state.openLineitems.length - 1) &&
                    <div>
                        <div 
                            className="nav__submenu-item_cart"
                            //onMouseEnter={this.handleHover(keyIndex)}
                        >
                        {this.state.showAddSubtract[keyIndex] === false &&
                            <div onMouseEnter={this.handleHover.bind(this, keyIndex)}>
                                 {fg.attributes.farmgood.name} 
                            - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                            </div>
                        }
                        {this.state.showAddSubtract[keyIndex] === true &&
                            <div onMouseLeave={this.handleHover.bind(this, keyIndex)}>
                                <button
                                    float="left"
                                    className="addSubtractItem"
                                    onClick={() => {this.props.addItem(fg)}}
                                >+</button>
                                {fg.attributes.farmgood.name} 
                                - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                                <button 
                                    float="right" 
                                    className="addSubtractItem"
                                    onClick={() => {this.props.deleteItem(fg)}}
                                >-</button>
                            </div>
                        }
                        </div>
                        <div className="nav__submenu-item">
                            <p>Total: {total}</p>
                            <a href="/checkout">
                                <button className="checkoutButton">Checkout</button>
                            </a>
                        </div>
                    </div>
                }
            </div>
        )
    })
  }

  render() {
    //debugger 
    const cartListMenu = this.cartList()//.bind(this)
    //debugger
    if (this.props.openLineitems.length > 0 ) {
        //debugger
        
        //const settingFalse = this.setCartAddSubtract();
        return (
            <div className="navcart">
                {cartListMenu}  
            </div>
        )
    } else { //<CartCardDropDown cartCardList={this.cartList()} handleHover={this.handleHover()} />
        return (
            <p>loading</p>
        )
    } 

  }
}

const mapStateToProps = (state) => {
    //console.log("mapstatetoprops in carcarddropdown")
    //debugger 
    return ({
        cart: state.cart,
        openLineitems: state.openLineitems, 
    })
  }
  
  export default connect(mapStateToProps, { getOpenLineItems })(CartCardDropDown);

  /*

  import React from 'react'
import { getOpenLineItems } from '../actions/lineitems';
import {connect} from 'react-redux';  
import CartCardDDModal from './CartCardDDModal'

class CartCardDropDown extends React.Component {
  constructor(props) {
    super(props)

    //debugger 

    var addSubtractArray = []
    var i;
    for (i = 0; i < this.props.openLineitems.length; i++) {
        addSubtractArray.push(false)
    }
      

    this.state = {
      openLineitems: this.props.openLineitems,
      showAddSubtract: addSubtractArray
      //total: 0
    }
  }

  handleHover(keyIndex){
   debugger 
    this.setState({
        showAddSubtract: this.state.showAddSubtract[keyIndex] = !this.state.showAddSubtract[keyIndex]
    })
  }

  setCartAddSubtract(){
      //debugger 
      
      var addSubtractArray = []
      var i;
      for (i = 0; i < this.state.openLineitems.length; i++) {
        addSubtractArray.push(false)
      }
      
      var equalArrays = true;
      //debugger 
      addSubtractArray.forEach((value, index) => {
          if (value !== this.state.showAddSubtract[index]) {
            equalArrays = false 
          }
      })

      if (equalArrays == false ) {
        //debugger 
        this.setState({
            showAddSubtract: addSubtractArray
        })
      }

    //debugger 
  }

  /*
  componentWillMount(){
    const cartListMenu = this.cartList()
    
    this.setState({cartListMenu: cartListMenu});
  }
    /*
    var addSubtractArray = []
    var i;
    for (i = 0; i < this.props.openLineitems.length; i++) {
      addSubtractArray.push(false)
    }
    
    var equalArrays = true;
    //debugger 
    addSubtractArray.forEach((value, index) => {
        if (value !== this.state.showAddSubtract[index]) {
          equalArrays = false 
        }
    })
    //debugger 
    if (equalArrays == false ) {
      //debugger 
      this.setState({
          showAddSubtract: addSubtractArray
      })
    } else {
        //debugger 
    }
  }
  //////////////////////////

 componentWillReceiveProps(nextProps){
    //debugger 
    //console.log("next props in carcarddropdown")
    
    if (sessionStorage.id === undefined) {
        this.setState({
            openLineitems: [],
            cart: [],
        })
        //console.log(this.state.openLineitems)
    } else {
        this.setState({
            openLineitems: nextProps.openLineitems,
            cart: nextProps.cart 
            //oldLineItems: nextProps.allLineItems 
        })
    }
  }


  cartList() {
    var total = 0;
    this.state.openLineitems.forEach(lineItem => total += (lineItem.attributes.farmgood.price * lineItem.attributes.quantity))
    //debugger
    return this.state.openLineitems.map((fg, keyIndex) => {
        return (
            <div key={keyIndex}>
                {keyIndex !== (this.state.openLineitems.length - 1) &&
                    <div 
                        className="nav__submenu-item_cart"
                        onMouseEnter={this.handleHover(keyIndex)}
                    >   
                        {this.state.showAddSubtract === false &&
                            <div>
                                 {fg.attributes.farmgood.name} 
                            - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                            </div>
                        }
                        {this.state.showAddSubtract === true &&
                        <div onMouseLeave={this.handleHover(keyIndex)}>
                            <button
                            float="left"
                            className="addSubtractItem"
                            onClick={() => {this.props.addItem(fg)}}
                            >+</button>
                            {fg.attributes.farmgood.name} 
                            - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                            <button 
                                float="right" 
                                className="addSubtractItem"
                                onClick={() => {this.props.deleteItem(fg)}}
                            >-</button>
                        </div>
                        }
                        
                    </div>
                }
                {keyIndex === (this.state.openLineitems.length - 1) &&
                    <div>
                        <div 
                            className="nav__submenu-item_cart"
                            onMouseEnter={this.handleHover.bind(this)}
                        >
                        {this.state.showAddSubtract === false &&
                            <div>
                                 {fg.attributes.farmgood.name} 
                            - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                            </div>
                        }
                        {this.state.showAddSubtract === true &&
                            <div>
                                <button
                                float="left"
                                className="addSubtractItem"
                                onClick={() => {this.props.addItem(fg)}}
                                >+</button>
                                {fg.attributes.farmgood.name} 
                                - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                                <button 
                                    float="right" 
                                    className="addSubtractItem"
                                    onClick={() => {this.props.deleteItem(fg)}}
                                >-</button>
                            </div>
                        }
                        </div>
                        <div className="nav__submenu-item">
                            <p>Total: {total}</p>
                            <a href="/checkout">
                                <button className="checkoutButton">Checkout</button>
                            </a>
                        </div>
                    </div>
                }
            </div>
        )
    })
  }

  render() {
    //debugger 
    //const cartListMenu = this.cartList()
    //debugger
    if (this.props.openLineitems.length > 0 ) {
        //debugger
        
        const settingFalse = this.setCartAddSubtract();
        return (
            <div className="navcart">
                <CartCardDropDown cartCardList={this.cartList()} handleHover={this.handleHover()} />
                {this.state.cartListMenu}    
            </div>
        )
    } else {
        return (
            <p>loading</p>
        )
    }

  }
}

const mapStateToProps = (state) => {
    //console.log("mapstatetoprops in carcarddropdown")
    //debugger 
    return ({
        cart: state.cart,
        openLineitems: state.openLineitems, 
    })
  }
  
  export default connect(mapStateToProps, { getOpenLineItems })(CartCardDropDown);




  */