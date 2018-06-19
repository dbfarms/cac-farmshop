import React, { Component } from 'react';
import { connect } from 'react-redux'
//import FarmGoodModal from '../components/farmGoodModal';
import CustomerFarmGoodModal from '../components/customerFarmgoodModal';
import FarmGoodsCard from '../components/FarmGoodsCard';
import FarmGoodCard from '../components/farmGoodCard';
import { getFarmGoods } from '../actions/farmGoods'; // requests list of farmgoods from server
import { getDays } from '../actions/days'; // requests from server
import { deleteFarmGoods } from '../actions/farmGoods';
import NewFarmgoodForm from './NewFarmgoodForm';
import EditFarmgoodForm from './EditFarmgoodForm';
import FarmgoodNav from '../components/farmgoodNav'
import ShopForDay from '../components/shopforday'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import './FarmGoods.css';
//import StickyHeader from 'react-sticky-header';
import CartCard from '../components/CartCard';
import VisitorCartCard from '../components/visitorCartCard';
import { getOpenLineItems } from '../actions/lineitems';
import SideBarCategory from './sideBarCategory';

class FarmGoods extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      filteredList: [],
      category: '',
      subcat: '',
      showKey: 'show all', //show all
      showDay: '',
      showCategory: '',
      days: [],
      isEditing: false,
      farmgood: {
        name: '',
        farmer: '', //EVENTUALLY THIS WILL DEFAULT TO THE LOGGED IN FARMER BUT FOR NOW YOU CAN CHOOSE
        days_available_ids: [],
        theWeek: [ 
          ["Monday", false],
          ["Tuesday", false],
          ["Wednesday", false],
          ["Thursday", false],
          ["Friday", false],
          ["Saturday", false],
          ["Sunday", false],
        ],
      },
      farmGoods_array: [],
      days_array: [],
//      daysAvailable: this.props.farmgood.attributes.daysAvailable,
      checkBoxDaysAvailable: this.props.checkBoxDaysAvailable
    };
    
  }

  componentWillMount(){
    if (this.props.farmgood === undefined ){
      this.props.getFarmGoods()
    }
    if (this.state.farmGoods_array === undefined){
      this.props.getFarmGoods()
    }
    this.props.getOpenLineItems(sessionStorage.id);

    Date.prototype.addDays = function(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    }
    const date = new Date
    const dayOfPickup = date.addDays(1).toDateString();
    const substringDaySelector = dayOfPickup.substr(0, dayOfPickup.indexOf(' '));
    this.setState({
      showDay: substringDaySelector
    })
    //debugger

    window.addEventListener('scroll', this.handleScroll);

  }

  handleScroll(){
    //debugger 
    console.log(window.scrollY)
  }

  selectedList(){
    //debugger 
    var thisFilter = []
    var catArray = []
    var category = '';
    var subcat = ''
    var lengthOfFg = this.state.farmGoods_array.length 
    
    this.state.farmGoods_array.map((farmGood, keyIndex) => {
      for (let i=0;i<farmGood.relationships.days.data.length; i++) {
        if (farmGood.relationships.days.data[i].name.substr(0, 2) === this.state.showDay.substr(0,2)) {
          if (farmGood.attributes.category.title != category) {
            
            category = farmGood.attributes.category.title
            const header = this.createHeader(category);
            //debugger 
            thisFilter.push(header)
          } 
          if (farmGood.attributes["sub-category"].title != subcat) {
            
            subcat = farmGood.attributes["sub-category"].title
            const subheader = this.createSubHeader(subcat);
            //debugger 
            if (catArray.length > 0) {
              thisFilter.push(catArray)
            }
              
            thisFilter.push(subheader)
            catArray = []
            catArray.push(farmGood)
            
          } else {
            debugger 
            catArray.push(farmGood)
          }
          //thisFilter.push(farmGood)
          
        }
      }
    })
    
    thisFilter.push(catArray)
    
    //checks to see if thisFilter is equal to this.state.filteredList and only sets State if necessary
    var equalArray = true;
    thisFilter.forEach((fg, keyIndex) => {
      if (fg != this.state.filteredList[keyIndex]) {
        equalArray = false
      }
    })
    
    if (equalArray == false) {
      //debugger
      this.setState({
        filteredList: thisFilter
      })
    }
    //debugger 
    console.log(this.state.filteredList)
  }

  componentWillReceiveProps(nextProps){
    
    this.setState({
      farmGoods_array: nextProps.farmGoods.data
    })
    
    this.selectedList();
    //console.log(this.state.farmGoods_array)
    //console.log(this.state.filteredList)
  }

  toggleEdit(){
    this.setState({isEditing: !this.state.isEditing})
  }

  handleIsEditing = farmGood => {
    this.props.history.push({
      pathname: `/farm-goods/${farmGood.id}`,
      farmGood,
    })
  }
  
  handleDelete(farmGood){
    this.props.deleteFarmGoods(farmGood);
    alert('deleting')
    this.setState({
      isEditing: false,
      showKey: 'show all',
    })
  }

  handleShowChange = showKey => this.setState({ showKey: showKey })
  handleDay = showDay => this.setState({ showDay: showDay  })
  handleCategory = showCategory => this.setState({ showCategory: showCategory })

  createHeader(cat){
    return (
      <div>
        <div className="section">{cat}</div>
      </div>
    )
  }

  createSubHeader(subcat){
    return (
      <div>
        <div className="sectionSub">{subcat}</div>
      </div>
    )
  }

  showGoodsSplit() {
    //debugger 

    return (
      <div>
      {this.state.farmGoods_array === undefined &&
        <p>loading loading</p>
      }
      {this.state.farmGoods_array != undefined &&
        <div className="Farm-Goods-Container">
          <div>
              <div className="header-one">
                <span>Currently For Sale</span>
              </div>
              {this.state.filteredList.map((farmGood, keyIndex) => {
                //debugger 

                if (farmGood.length === undefined) {
                  //debugger 
                  return (
                    <div key={keyIndex}>
                      {farmGood}
                    </div>
                  )
                } else if (farmGood.length > 0) {
                  //debugger 
                  return (
                    <div className="fg-grid" key={keyIndex}>
                    {farmGood.map(fg => {
                      return (<CustomerFarmGoodModal  
                      key={fg.id} 
                      farmGood={fg} 
                      //lineitems={this.state.openLineitems} 
                    />)
                    })}
                    
                  </div>
                  )
                }
              }
                
                )
              }
          </div>
        </div>
        }
      </div>
    )
  }


  render() {
    //debugger
    //const sortedFGs = this.sortFgs()
   //className="top"
    return (
      <div>
        <div className="subheader">
          <div>
            <div id="fixed1">
              <FarmgoodNav 
                changeShow={this.handleShowChange} 
                //changeDay={this.handleDay} 
                changeCategory={this.handleCategory}
              />
              <SideBarCategory />
            </div>
          </div>
          <div className="shoppingFor">
            <ShopForDay 
            changeDay={this.handleDay}
            />
          </div>
          <div>
          </div>
        </div>
        <MediaQuery query="(max-width: 1294px)" >
        <div>
          <MediaQuery query="(max-width: 1293px)" >
          <div className="page-tree-small">
            
            <div>
              {this.showGoodsSplit()}
            </div>
            <br />
          </div>
          </MediaQuery>
        </div>
        </MediaQuery>
        
        <MediaQuery query="(min-width: 1294px)" > 
          
          <div className="page-tree">
            <div>
              <p>category filler</p>
            </div>
            <div>
              {this.showGoodsSplit()}
            </div>
          </div>
        </MediaQuery>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  //const stateDays = Object.assign([], state.days)
  return ({
      farmGoods: state.farmGoods.all,
      days: state.days 
  })
}

export default connect(mapStateToProps, { getFarmGoods, getOpenLineItems, deleteFarmGoods })(FarmGoods); // 

/*

import React, { Component } from 'react';
import { connect } from 'react-redux'
//import FarmGoodModal from '../components/farmGoodModal';
import CustomerFarmGoodModal from '../components/customerFarmgoodModal';
import FarmGoodsCard from '../components/FarmGoodsCard';
import FarmGoodCard from '../components/farmGoodCard';
import { getFarmGoods } from '../actions/farmGoods'; // requests list of farmgoods from server
import { getDays } from '../actions/days'; // requests from server
import { deleteFarmGoods } from '../actions/farmGoods';
import NewFarmgoodForm from './NewFarmgoodForm';
import EditFarmgoodForm from './EditFarmgoodForm';
import FarmgoodNav from '../components/farmgoodNav'
import ShopForDay from '../components/shopforday'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import './FarmGoods.css';
//import StickyHeader from 'react-sticky-header';
import CartCard from '../components/CartCard';
import VisitorCartCard from '../components/visitorCartCard';
import { getOpenLineItems } from '../actions/lineitems';
import SideBarCategory from './sideBarCategory';

class FarmGoods extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      category: '',
      subcat: '',
      showKey: 'show all', //show all
      showDay: '',
      showCategory: '',
      days: [],
      isEditing: false,
      farmgood: {
        name: '',
        farmer: '', //EVENTUALLY THIS WILL DEFAULT TO THE LOGGED IN FARMER BUT FOR NOW YOU CAN CHOOSE
        days_available_ids: [],
        theWeek: [ 
          ["Monday", false],
          ["Tuesday", false],
          ["Wednesday", false],
          ["Thursday", false],
          ["Friday", false],
          ["Saturday", false],
          ["Sunday", false],
        ],
      },
      farmGoods_array: [],
      days_array: [],
//      daysAvailable: this.props.farmgood.attributes.daysAvailable,
      checkBoxDaysAvailable: this.props.checkBoxDaysAvailable
    };
    
  }

  componentWillMount(){
    if (this.props.farmgood === undefined ){
      this.props.getFarmGoods()
    }
    if (this.state.farmGoods_array === undefined){
      this.props.getFarmGoods()
    }
    this.props.getOpenLineItems(sessionStorage.id);

    Date.prototype.addDays = function(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    }
    const date = new Date
    const dayOfPickup = date.addDays(1).toDateString();
    const substringDaySelector = dayOfPickup.substr(0, dayOfPickup.indexOf(' '));
    this.setState({
      showDay: substringDaySelector
    })
    //debugger

    window.addEventListener('scroll', this.handleScroll);

  }

  handleScroll(){
    //debugger 
    console.log(window.scrollY)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      farmGoods_array: nextProps.farmGoods.data
    })
  }

  toggleEdit(){
    this.setState({isEditing: !this.state.isEditing})
  }

  handleIsEditing = farmGood => {
    this.props.history.push({
      pathname: `/farm-goods/${farmGood.id}`,
      farmGood,
    })
  }
  
  handleDelete(farmGood){
    this.props.deleteFarmGoods(farmGood);
    alert('deleting')
    this.setState({
      isEditing: false,
      showKey: 'show all',
    })
  }

  handleShowChange = showKey => this.setState({ showKey: showKey })
  handleDay = showDay => this.setState({ showDay: showDay  })
  handleCategory = showCategory => this.setState({ showCategory: showCategory })

  showGoodsSplit() {
    //debugger 
    var thisFilter = []

    return (
      <div>
      {this.state.farmGoods_array === undefined &&
        <p>loading loading</p>
      }
      {this.state.farmGoods_array != undefined &&
        <div className="Farm-Goods-Container">
          <div>
              <div className="header-one">
                <span>Currently For Sale</span>
              </div>
              <div className="fg-grid">
              {this.state.farmGoods_array.map(farmGood => {
                //debugger 
                for (let i=0;i<farmGood.relationships.days.data.length; i++) {
                  if (farmGood.relationships.days.data[i].name.substr(0, 2) === this.state.showDay.substr(0,2)) {
                    thisFilter.push(farmGood)
                  }
                }
              })}
                {thisFilter.map((farmGood, keyIndex) => {
                  //debugger 

                  if (keyIndex === 0 ) {
                    return (
                      <div>
                        <div className="section">{farmGood.attributes.category.title}</div>
                        <span className="sectionSub">{farmGood.attributes["sub-category"].title}</span>
                        <CustomerFarmGoodModal  
                          key={farmGood.id} 
                          farmGood={farmGood} 
                          lineitems={this.state.openLineitems} />
                      </div>
                    )
                  } 
                  if (this.state.category == farmGood.attributes.category.title){
                    debugger 
                  }

                  return (
                    <div key={keyIndex}>
                    <CustomerFarmGoodModal  
                      key={farmGood.id} 
                      farmGood={farmGood} 
                      lineitems={this.state.openLineitems} />
                  </div>
                  )
                }
                  
                  )
                }
              </div>
          </div>
        </div>
        }
      </div>
    )
  }


  render() {
    //debugger
    //const sortedFGs = this.sortFgs()
   //className="top"
    return (
      <div>
        <div className="subheader">
          <div>
            <div id="fixed1">
              <FarmgoodNav 
                changeShow={this.handleShowChange} 
                //changeDay={this.handleDay} 
                changeCategory={this.handleCategory}
              />
              <SideBarCategory />
            </div>
          </div>
          <div className="shoppingFor">
            <ShopForDay 
            changeDay={this.handleDay}
            />
          </div>
          <div>
          </div>
        </div>
        <MediaQuery query="(max-width: 1294px)" >
        <div>
          <MediaQuery query="(max-width: 1293px)" >
          <div className="page-tree-small">
            
            <div>
              {this.showGoodsSplit()}
            </div>
            <br />
          </div>
          </MediaQuery>
        </div>
        </MediaQuery>
        
        <MediaQuery query="(min-width: 1294px)" > 
          
          <div className="page-tree">
            <div>
              <p>category filler</p>
            </div>
            <div>
              {this.showGoodsSplit()}
            </div>
          </div>
        </MediaQuery>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  //const stateDays = Object.assign([], state.days)
  return ({
      farmGoods: state.farmGoods,
      days: state.days 
  })
}

export default connect(mapStateToProps, { getFarmGoods, getOpenLineItems, deleteFarmGoods })(FarmGoods); // 


////
showGoodsSplit() {
    var thisFilter = []
    return (
      <div>
      {this.state.farmGoods_array === undefined &&
        <p>loading loading</p>
      }
      {this.state.farmGoods_array != undefined &&
        <div className="Farm-Goods-Container">
        {this.state.showKey === "show all" && 
          <div>
              <div className="header-one">
                <span>Currently For Sale</span>
              </div>
              <div className="fg-grid">
                {this.state.farmGoods_array.map(farmGood =>  
                  <CustomerFarmGoodModal 
                    key={farmGood.id} 
                    farmGood={farmGood} 
                    lineitems={this.state.openLineitems}
                  />
                  )
                }
              </div>
          </div>
        }
        {this.state.showKey === "day"  &&
            <div>
              <h1>{this.state.showDay}</h1>
              
              {this.state.farmGoods_array.map(farmGood => {
                for (let i=0; i<farmGood.relationships.days.data.length; i++) {
                  if (farmGood.relationships.days.data[i].name === this.state.showDay) {
                    thisFilter.push(farmGood)
                  }
                }
              })
              }
              {thisFilter.map(farmGood => <CustomerFarmGoodModal  key={farmGood.id} farmGood={farmGood} lineitems={this.state.openLineitems} />)}
            </div>
        }
        {this.state.showKey === "category"  &&
            <div>
              <h1>{this.state.showCategory}</h1>
              {this.state.farmGoods_array.map(farmGood => {
                  if (farmGood.attributes.category.title === this.state.showCategory) {
                    thisFilter.push(farmGood)
                  }
              })
              }
              {thisFilter.map(farmGood => <CustomerFarmGoodModal  key={farmGood.id} farmGood={farmGood} lineitems={this.state.openLineitems} />)}
            </div>
        }
        </div>
        }
      </div>
    )
  }

*/