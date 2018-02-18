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

    dayFunction(){
        
    }


    render(){
        return(
        
        <Dropdown className="dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Dropdown
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem header>Farm Goods</DropdownItem>
                <DropdownItem header>By Day</DropdownItem>
                <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Monday')
                    }}>Monday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Tuesday')
                    }}>Tuesday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Wednesday')
                    }}>Wednesday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Thursday')
                    }}>Thursday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Friday')
                    }}>Friday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Saturday')
                    }}>Saturday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('day')
                    this.props.changeDay('Sunday')
                    }}>Monday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('show all')
                    this.props.changeDay('Any Day')
                    }}>Monday</DropdownItem>
                
                <DropdownItem divider />
                <DropdownItem onClick={() => this.props.changeShow('category')}>By Category</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.props.changeShow('new')}>New</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        )
    }
}

