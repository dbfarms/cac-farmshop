import React from 'react'
import '../containers/farmgoodNav.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

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

    farmgoodNew = () => {
        this.context.router.push('/new-farm-good');
    }


    render(){

        if (sessionStorage.role === "farmer") {
            return(
                <Dropdown className="dropdowntext" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                    Sort Farmgoods
                    </DropdownToggle>
                    <DropdownMenu>
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
                            }}>Sunday</DropdownItem>
                         <DropdownItem onClick={() => {
                            this.props.changeShow('show all')
                            this.props.changeDay('Any Day')
                            }}>Show All</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem header>By Category</DropdownItem>
                        <DropdownItem onClick={() => {
                            this.props.changeShow('category')
                            this.props.changeCategory('Vegetables/Fruit')
                            }}>Fruit & Vegetables</DropdownItem>
                        <DropdownItem onClick={() => {
                            this.props.changeShow('category')
                            this.props.changeCategory('Meat')
                            }}>Meat</DropdownItem>
                         <DropdownItem onClick={() => {
                            this.props.changeShow('category')
                            this.props.changeCategory('Dairy')
                            }}>Dairy</DropdownItem>
                         <DropdownItem onClick={() => {
                            this.props.changeShow('category')
                            this.props.changeCategory('Eggs')
                            }}>Eggs</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem href="/new-farm-good">New</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )
        } else {
            return(
                <Dropdown className="dropdowntext" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                    Category
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Available By Day</DropdownItem>
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
                            }}>Sunday</DropdownItem>
                         <DropdownItem onClick={() => {
                            this.props.changeShow('show all')
                            this.props.changeDay('Any Day')
                            }}>Show All</DropdownItem>
                        <DropdownItem divider />
                    </DropdownMenu>
                </Dropdown>
            )
        }
    }
}

/*

<DropdownItem header>By Category</DropdownItem>
                        <DropdownItem onClick={() => {
                            this.props.changeShow('category')
                            this.props.changeCategory('Vegetables/Fruit')
                            }}>Fruit & Vegetables</DropdownItem>
                        <DropdownItem onClick={() => {
                            this.props.changeShow('category')
                            this.props.changeCategory('Meat')
                            }}>Meat</DropdownItem>
                         <DropdownItem onClick={() => {
                            this.props.changeShow('category')
                            this.props.changeCategory('Dairy')
                            }}>Dairy</DropdownItem>
                         <DropdownItem onClick={() => {
                            this.props.changeShow('category')
                            this.props.changeCategory('Eggs')
                            }}>Eggs</DropdownItem>

import React from 'react'
import '../containers/farmgoodNav.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

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

    farmgoodNew = () => {
        this.context.router.push('/new-farm-good');
    }


    render(){
        return(
        <Dropdown className="dropdowntext" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Sort Farmgoods
            </DropdownToggle>
            <DropdownMenu>
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
                    }}>Sunday</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('show all')
                    this.props.changeDay('Any Day')
                    }}>Show All</DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>By Category</DropdownItem>
                <DropdownItem onClick={() => {
                    this.props.changeShow('category')
                    this.props.changeCategory('Vegetables/Fruit')
                    }}>Fruit & Vegetables</DropdownItem>
                <DropdownItem onClick={() => {
                    this.props.changeShow('category')
                    this.props.changeCategory('Meat')
                    }}>Meat</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('category')
                    this.props.changeCategory('Dairy')
                    }}>Dairy</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.props.changeShow('category')
                    this.props.changeCategory('Eggs')
                    }}>Eggs</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/new-farm-good">New</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        )
    }
}


*/