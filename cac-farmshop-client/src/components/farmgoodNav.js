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
            dropdownOpen: false
        };
    }

    toggle(){
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render(){
        return(
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Dropdown
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header>Farm Goods</DropdownItem>
                <DropdownItem>By Day</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>By Category</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        )
    }
}

/*
<DropdownItem disabled>Action</DropdownItem>
const FarmgoodNav = ({ changeShow }) => 
    <div>
        <button className="farmnav-button" onClick={() => changeShow('farmGoods')}>Farm Goods</button>
        <button className="farmnav-button" onClick={() => changeShow('dailyGoods')}>Daily</button>
        <button className="farmnav-button" onClick={() => changeShow('category')}>Category</button>
    </div>

export default FarmgoodNav
*/