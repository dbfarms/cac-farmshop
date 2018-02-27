import React, {PropTypes} from 'react';  
import TextInput from './common/TextInput';  
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';  
import * as sessionActions from '../actions/sessionActions';

class SignUpPage extends React.Component {  
    
  constructor(props) {
    super(props);
    this.state = {credentials: {email: '', password: '', password_confirmation: ''}}
    this.onChange = this.onChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSignUp(event) {
      event.preventDefault();
      this.props.actions.signUpUser(this.state.credentials);
  }

  render() {
    return (
      < div>

        < form>
          <label>SIGN-UP</label>
          < TextInput
            name="email"
            label="email"
            value={this.state.credentials.email}
            onChange={this.onChange}/>

          < TextInput
            name="password"
            label="password"
            type="password"
            value={this.state.credentials.password}
            onChange={this.onChange}/>

             < TextInput
            name="password_confirmation"
            label="password_confirmation"
            type="password"
            value={this.state.credentials.password_confirmation}
            onChange={this.onChange}/>

            < TextInput
            name="authorization"
            label="authorization"
            type=""
            value={this.state.credentials.authorization}
            onChange={this.onChange}/>

            

          < input
            type="submit"
            className="btn btn-primary"
            onClick={this.onSignUp}/>
        
        </form>

     </div> 
    );
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SignUpPage);