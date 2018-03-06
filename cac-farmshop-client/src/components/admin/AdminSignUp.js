import React, {PropTypes} from 'react';  
import TextInput from '../common/TextInput';  
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';  
import * as sessionActions from '../../actions/sessionActions';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';

class AdminSignUpPage extends React.Component {  
    
  constructor(props) {
    super(props);

    this.state = {
        credentials: {
            email: '', 
            password: '', 
            password_confirmation: '',
            authorization: 'change role'
        },
        dropdownOpen: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.toggle = this.toggle.bind(this);

  }

  toggle(){
    this.setState({
        dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSignUp(event) {
      event.preventDefault();
      this.props.actions.signUpUser(this.state.credentials, this.props.history);
  }

  onRoleChange(role){
      this.setState({
          credentials: {
              authorization: role
          }
      })
      console.log(role)
  }

  render() {
    return (
      < div>

        < form>
          <label>Create New User</label>
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

            <Dropdown className="dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {this.state.credentials.authorization}
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem header>Authorization</DropdownItem>
                <DropdownItem onClick={() => {
                    this.onRoleChange('customer')
                    }}>Customer</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.onRoleChange('farmer')
                    }}>Farmer</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.onRoleChange('admin')
                    }}>Admin</DropdownItem>
                </DropdownMenu>
            </Dropdown>

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

export default connect(null, mapDispatchToProps)(AdminSignUpPage);


/*


    
            < TextInput
            name="authorization"
            label="authorization"
            type=""
            value={this.state.credentials.authorization}
            onChange={this.onChange}/>

*/