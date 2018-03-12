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
            authorization: 'change role',
            first_name: '',
            last_name: '',
            typeOfUser: {
              authorization: '',
              name: '',
              address: '',
            },
        },
        dropdownOpen: false,
    }

    this.onTypeChange = this.onTypeChange.bind(this);
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

  onTypeChange(event) {
    const field = event.target.name;
    const typeOfUser = this.state.credentials.typeOfUser;
    typeOfUser[field] = event.target.value;
    return this.setState({typeOfUser: typeOfUser});
  }

  onSignUp(event) {
      event.preventDefault();
      //debugger 
      this.props.actions.adminSignUpUser(this.state.credentials, this.props.history, this.state.type); //need type!
  }

  onRoleChange(role){
      //debugger 
      const field = "authorization" 
      const credentials = this.state.credentials;
      credentials[field] = role 
      return this.setState({credentials: credentials})
      
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
            name="first_name"
            label="first name"
            value={this.state.credentials.first_name}
            onChange={this.onChange}/>

          < TextInput
            name="last_name"
            label="last name"
            value={this.state.credentials.last_name}
            onChange={this.onChange}/>

          < TextInput
            name="password"
            label="password"
            type="password"
            value={this.state.credentials.password}
            onChange={this.onChange}/>

          < TextInput
          name="password_confirmation"
          label="password confirmation"
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
            {this.state.credentials.authorization === '' &&
              <div>
              </div>
            }
            {this.state.credentials.authorization === 'farmer' &&
              <div>
              < TextInput
                name="name"
                label="name"
                value={this.state.credentials.typeOfUser.name}
                onChange={this.onTypeChange}/>

                < TextInput
                name="address"
                label="address"
                value={this.state.credentials.typeOfUser.address}
                onChange={this.onTypeChange}/>
              </div>
            }
            {this.state.credentials.authorization === 'customer' && //enter customer stuff below
              <div>
                 < TextInput
                name="name"
                label="name"
                value={this.state.credentials.typeOfUser.name}
                onChange={this.onTypeChange}/>

                < TextInput
                name="address"
                label="address"
                value={this.state.credentials.typeOfUser.address}
                onChange={this.onTypeChange}/>
              </div>
            }
            {this.state.credentials.authorization === 'admin' && //enter admin below
              <div>
                 < TextInput
                name="name"
                label="name"
                value={this.state.credentials.typeOfUser.name}
                onChange={this.onTypeChange}/>

                < TextInput
                name="address"
                label="address"
                value={this.state.credentials.typeOfUser.address}
                onChange={this.onTypeChange}/>
              </div>
            }

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