import React, { Component } from 'react';

class FarmerCard extends Component {
  constructor(props){
    super(props)

    this.state = {
      farmer: this.props.farmer 
    }
  }

  render(){
    const farmer = this.state.farmer 
    const bg = farmer.attributes["link"]

    return (
      <div>
        <div className="FarmerCard" style ={ { backgroundImage: "url(" + bg + ")" } } >
          <a href={"/farmers/" + farmer.id} >
            <span>{farmer.attributes.name}</span>
            <p>{farmer.attributes.address}</p>
          
          </a>
        </div>
      </div> 
    )
  }

}
  
export default FarmerCard

/*
const FarmerCard = ({ farmer }) => {
  const bg = farmer.attributes["link"]

  return (
    <li className="FarmerCard" style ={ { backgroundImage: "url(" + bg + ")" } } >
      <a key={farmer.id} href={"/farmers/" + farmer.id} >
        <h3>{farmer.attributes.name}</h3>
        <p>{farmer.attributes.address}</p>
      
      </a>
    </li>
  )

}
//className="FarmerCard" 



export default FarmerCard

/*

<img className="FarmerImage" src={farmer.attributes.link} alt={farmer.attributes.name} />

*/