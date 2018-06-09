import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getSingleFarmGood } from '../actions/farmGoods'; //
 
class FarmgoodShow extends Component {
    constructor(props){
        super(props)

        this.state = {
            farmgood: this.props.farmgood
        }
    }

    componentWillMount(){
        const routeArray = document.location.href.split('/');
        const farmgoodID = Number(routeArray[routeArray.length - 1])
        const farmerID = Number(routeArray[routeArray.length - 3])
        //debugger 
        this.props.getSingleFarmGood(farmerID, farmgoodID);
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            farmgood: nextProps.farmgood.data
        })
    }

    listOfFarmGoods(){
        const fg = this.state.farmgood
        //debugger 
        return (
            <div className="defaultText">
                <a href={"http://localhost:3001/farmers/" + fg.attributes.farmer.id + "/farmgoods/"}>
                    See All {fg.attributes.farmer.name} Farm Goods
                </a>

                <div className="farmgoodShow">

                    <img src={fg.attributes["img-url"]} />
                    <h3>{fg.attributes.name}  </h3> 
                    <p>Price: {fg.attributes.price}</p>
                    <p>{fg.attributes.details}</p>
                    
                    <div className="farmerdetails">
                    <img src="" alt="farmer image here"/>
                    <h3>{fg.attributes.farmer.name}</h3>

                    </div>
                </div>
            </div>
        )
    }

    render(){
        //debugger 
        var displayFarmgood = ""
        if (this.state.farmgood.length === undefined) {
            var displayFarmgood = this.listOfFarmGoods()
        } else {
            var displayFarmgood = "test"
        }

        //debugger 

        return(
            <div>
                {displayFarmgood}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    //debugger
    return {
        farmgood: state.farmGoods
    }
}

export default connect(mapStateToProps, { getSingleFarmGood })(FarmgoodShow);