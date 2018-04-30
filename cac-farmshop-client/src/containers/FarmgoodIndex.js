import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllFarmerGoods } from '../actions/farmGoods';
import CustomerFarmGoodModal from '../components/customerFarmgoodModal';
import FarmerProfile from '../components/FarmerProfile';
import MediaQuery from 'react-responsive';

class FarmgoodIndex extends Component {
    constructor(props){
        super(props)

        this.state = {
            farmgoods: []
        }
    }

    componentWillMount() {
        const routeArray = document.location.href.split('/');
        const farmer_id = Number(routeArray[routeArray.length - 3])
        //debugger 
        this.props.getAllFarmerGoods(farmer_id);
    }

    componentWillReceiveProps(nextProps){
        //debugger 
        this.setState({
            farmgoods: nextProps.farmgoods
        })
    }

    setGoods = () => {
        
        const goods = this.state.farmgoods 

        if (goods != undefined) {
            if (goods.length > 0) {
                
            }
        }
        //debugger 
        return (
            <div>
            <MediaQuery query="(min-width: 1375px)" >
                <div className="page-tree-farmerfarmgoods">
                    {goods != undefined && 
                    <div>
                        {goods.length > 0 &&
                        <div>
                            {console.log(goods)}
                            <FarmerProfile farmer={goods[0].attributes.farmer} />
                        </div>
                        }
                    </div>
                    }
                    <div></div>
                    {goods != undefined &&
                    <div>
                        {goods.length > 0 &&
                        <div>
                            <ul className="fg-grid">
                            {goods.map((good, keyIndex) => {
                                return (
                                    <li key={keyIndex}>
                                        <CustomerFarmGoodModal 
                                            key={good.id} 
                                            farmGood={good} 
                                            farmgoodscard="indexFarmGood"
                                        />
                                    </li>
                                )
                            })

                            }
                            </ul>
                        </div>
                        }
                    </div>
                    }
                </div>
            </MediaQuery>
            <MediaQuery query="(max-width: 1375px)" >
                 <div className="page-tree-farmerfarmgoods">
                    {goods != undefined && 
                    <div>
                        {goods.length > 0 &&
                        <div>
                            {console.log(goods)}
                            <FarmerProfile farmer={goods[0].attributes.farmer} />
                        </div>
                        }
                    </div>
                    }
                    <div></div>
                    {goods != undefined &&
                    <div>
                        {goods.length > 0 &&
                        <div>
                            <ul className="fg-grid-small">
                            {goods.map((good, keyIndex) => {
                                return (
                                    <li key={keyIndex}>
                                        <CustomerFarmGoodModal 
                                            key={good.id} 
                                            farmGood={good} 
                                            farmgoodscard="indexFarmGood"
                                        />
                                    </li>
                                )
                            })
                            }
                            </ul>
                        </div>
                        }
                    </div>
                    }
                </div>
            </MediaQuery>
            <MediaQuery query="(max-width: 708px)" >
            
            </MediaQuery>
        </div>
        )
    }

    render(){
        const farmgoodsIndex = this.setGoods();
        return (
            <div>
                {
                <div>
                    {farmgoodsIndex}
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    // for some reason this eventually returns undefined and need to figure out why
    if (state.farmGoods != undefined) {
        return {
            farmgoods: state.farmGoods
        }
    } else {
        return {
            farmgoods: []
        }
    }
    
}

export default connect(mapStateToProps, { getAllFarmerGoods })(FarmgoodIndex)