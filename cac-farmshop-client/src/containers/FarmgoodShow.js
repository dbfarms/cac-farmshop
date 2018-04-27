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
            <div className="farmgoodShow">
                <img src={fg.attributes["img-url"]} />
                <h3>{fg.attributes.name}  </h3> 
                <p>Price: {fg.attributes.price}</p>
                <p>{fg.attributes.details}</p>
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

        return(
            <div>
            {this.state.farmgood.length === undefined &&
                <div>
                    {displayFarmgood}
                </div>
            }
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