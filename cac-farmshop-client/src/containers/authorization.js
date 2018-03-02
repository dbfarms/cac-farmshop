import React, { Component } from 'react'
import {connect} from 'react-redux';  
import { getUser } from '../actions/sessionActions';


export default function Authorization(allowedRoles) {
  return WrappedComponent => {
  class WithAuthorization extends Component {
      constructor(props) {
        super(props);
        debugger
      }
      render() {
        const { user } = this.props;
        if (allowedRoles.includes(user.account_type)) {
          return <WrappedComponent {...this.props} />;
        } else {
          return <h1>No page for you!</h1>;
        }
      }
    };
return connect(state => {
      return { user: state.application.user };
    })(WithAuthorization);
};
};

/*
const Authorization = (WrappedComponent, allowedRoles, logged_in) => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        user: {
          name: 'guest',
          role: 'guest'
        }
      }
    }

    componentWillMount(){
      this.props.getUser()
      //debugger 
    }
  

    render() {
      debugger 
      const { role } = this.state.user
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>No page for you!</h1>
      }
    }
  }
}

//export default Authorization


const mapStateToProps = (state, ownProps) => {
  debugger 
    return ({
      logged_in: state.session
    })
  }
  
export default connect(mapStateToProps)(Authorization);
  


  ///////////
//function mapStateToProps(state, ownProps) {
//  return {logged_in: state.session};
//}

//export default connect(mapStateToProps)(Authorization);

//export default Authorization 


/*

const Authorization = (WrappedComponent, allowedRoles) => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {
        user: {
          name: 'guest',
          role: 'guest'
        }
      }
    }

    componentWillMount(){
      this.props.getUser()
      //this.props.getFarmGoods()
      //WHEN I PUT ANOTHER GET REQUEST HERE IT BREAKS THE PROGRAM. BUT WHY?
    }
  

    render() {
      debugger 
      const { role } = this.state.user
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>No page for you!</h1>
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
      userStatus: state.userStatus,
  })
}

export default connect(mapStateToProps, { getUser})(Authorization);

function mapStateToProps(state, ownProps) {
  
  return {logged_in: state.session};
}

export default connect(mapStateToProps)(Authorization);
*/
