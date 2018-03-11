import React, { Component } from 'react';

import { getUsers } from '../actions/sessionActions';
import { connect } from 'react-redux';

class User extends Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    componentWillMount(){
        this.props.getUsers();
    }

    render() {
        debugger 
        return(
            <div>

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
  
  