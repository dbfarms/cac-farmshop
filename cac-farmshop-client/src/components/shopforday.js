import React from 'react'
import '../containers/farmgoodNav.css';
//import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

export default class ShopForDay extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dropdownOpen: false,
            showDate: false,
            weekOrder: [],
            selectedOption: 'option0',
            daysTo: 1,
        };
    }

    componentDidMount(){
        Date.prototype.addDays = function(days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        }
        
        var dat = new Date();

        var i;
        const date = new Date();
        const dateArray = [];

        for (i = 2; i < 8; i++) {
            var dateToAdd = date.addDays(i).toDateString();
            dateArray.push(dateToAdd)
        }
        this.setState({
            weekOrder: dateArray
        })
    }

    hoverMenu(event){
        //debugger
        this.setState({
            showDate: true,
        });
    }

    leaveHoverMenu(event){
        this.setState({ showDate: false})
    }

    setPickupDate(){    
        Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
        }
          
        var dat = new Date();
        
        return dat.addDays(this.state.daysTo).toDateString();

    }

    htmlWeek() {

        return (
        <div>
            {this.state.weekOrder.map((nextDay, keyIndex)=> {
            return (
                    <div 
                        key={keyIndex}
                        className="setDate"
                    >   
                        <label>
                            <input 
                                type="radio" 
                                value={keyIndex} 
                                checked={this.state.selectedOption === `option${keyIndex}`}
                                onChange={this.handleOptionChange.bind(this)}    
                            />
                            {nextDay}
                        </label>
                            
                    </div>
            )
        })
        }
        </div>
        )
    }

    handleOptionChange(event){
        //debugger 
        const daysToPickup = Number(event.target.value) + 1
        this.setState({
            selectedOption: event.target.value, 
            daysTo: daysToPickup
        })
    }

    render(){
        const showRestOfWeek = this.htmlWeek();
        const dateToPickup = this.setPickupDate();
        //debugger 
        return(
            <div 
                onMouseLeave={this.leaveHoverMenu.bind(this)}
            >
                <div 
                    onMouseEnter={this.hoverMenu.bind(this)}
                    >Shopping for {dateToPickup}
                </div>
                {this.state.showDate === true &&
                    <div>
                        <ReactCSSTransitionGroup
                            transitionName="slide"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        >
                            {showRestOfWeek}
                        </ReactCSSTransitionGroup>
                    </div>
                }
                
            </div>
        )
    }
}

