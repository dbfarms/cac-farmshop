import React, { Component } from 'react';
import ViewUsers from '../components/viewUsers'
import { getUsers } from '../actions/sessionActions';
import { connect } from 'react-redux';

class User extends Component {
    constructor(props){
        super(props)

        this.state = {
            usersArray: []
        }
    }

    componentWillMount(){
        this.props.getUsers();
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
          usersArray: nextProps.users
        })
      }
    
    render() {
        //const usersList = this.displayUsers(this.props.users)
        return(
            <div>
                <ViewUsers usersList={this.state.usersArray} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //debugger 
    return ({
        users: state.users,
    })
  }
  
  export default connect(mapStateToProps, { getUsers })(User); // 
  
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