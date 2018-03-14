import React, { Component } from 'react';
import ViewUsers from '../components/viewUsers'
import ViewCustomerUsers from '../components/viewCustomerUsers'
import { getUsers } from '../actions/sessionActions';
import { getCustomerUsers } from '../actions/sessionActions';
import { getCombinedUsers } from '../actions/sessionActions';
//import * as getAllUsers from '../actions/sessionActions';
import { connect } from 'react-redux';
import './components.css';

class User extends Component {
    constructor(props){
        super(props)

        this.state = {
            usersArray: [],
            customersArray: undefined,
            users: undefined 
        }
    }

    componentWillMount(){
        this.props.getCombinedUsers();
        //this.props.getUsers();
        //this.props.getCustomerUsers();
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        if (nextProps.users.farmers !== undefined)  {
            this.setState({
            usersArray: nextProps.users.farmers,
            })
        }

        if (nextProps.users.customers !== undefined)  {
            this.setState({
                customersArray: nextProps.users.customers 
            })
        }
    }
   
    
    render() {
        //debugger 
        return(
            <div className="userIndex">
            {this.state.usersArray !== undefined &&
                <div>
                    <label> Farmers </label>
                    <ViewUsers usersList={this.state.usersArray} />
                    <br />
                </div>
            }
            {this.state.customersArray !== undefined &&
                <div>
                    <label> Customers </label>
                    <ViewCustomerUsers customersList={this.state.customersArray} />
                    <br />
                </div>

            }
                
            </div>
        )
    }
}

//<label> Farmers </label>
//<label> Customers </label>
//<ViewCustomerUsers customersList={this.state.customersArray}/>

const mapStateToProps = (state, ownProps) => {
    //debugger 
    return ({
        users: state.users,
        //customers: state.customers
    })
  }
  
  //export default connect(mapStateToProps, { getUsers, getCustomerUsers })(User); 
  export default connect(mapStateToProps, { getCombinedUsers })(User);  
  
/*

displayUsers(usersList){
        //debugger
        return usersList.forEach(user => (
           Object.entries(usersList).map(function(keyName, keyIndex) {
               <div>
                   <label>{keyName}</label>
               </div>
            })
        )
    )}

/////

{usersList === 'true' &&
                <div>

                </div>
            }
            {usersList !== 'true' &&
                <div>
                </div>
            }


*/