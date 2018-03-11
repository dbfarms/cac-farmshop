import React, { Component } from 'react';

import { getUsers } from '../actions/sessionActions';
import { connect } from 'react-redux';

class User extends Component {
    constructor(props){
        super(props)

        this.state = {
            users: []
        }
    }

    componentWillMount(){
        this.props.getUsers();
    }

    render() {
        //debugger 
        return(
            <div>
                {this.props.users}
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
  
  