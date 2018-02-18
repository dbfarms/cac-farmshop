import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../containers/farmgoodNav.css';

//
//
// PROBABLY GOING TO MOVE THIS DROPDOWN TO BE MAIN NAV BAR
//
//

export default class FarmgoodNav extends React.Component {
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggle(){
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }


    render(){
        return(
        
        <Dropdown className="dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Dropdown
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem header>Farm Goods</DropdownItem>
                <DropdownItem onClick={() => this.props.changeShow('day')}>By Day</DropdownItem>
                <DropdownItem onClick={() => this.props.changeShow('category')}>By Category</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.props.changeShow('new')}>New</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        )
    }
}

