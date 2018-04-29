import React from 'react';
//ort FarmerView from './FarmerView';
//import FarmgoodView from './FarmgoodView';
import { Route } from 'react-router-dom';

/*
var bg=require('../../../../images/products/cards/main.jpg')
return (      
  <div className="ProductItem">

      <div className='background-image' style ={ { backgroundImage: "url("+bg+")" } }></div>
*/

const FarmerCard = ({ farmer }) => {
  const bg = farmer.attributes["link"]

  return (
    <div className="FarmerCard" style ={ { backgroundImage: "url("+bg+")" } } >
      
      <a key={farmer.id} href={"/farmers/" + farmer.id} >
        <h3>{farmer.attributes.name}</h3>
        <p>{farmer.attributes.address}</p>
      
      </a>
    </div>
  )

  const divStyle = {
    color: 'blue',
    backgroundImage: 'url(' + farmer.attributes["link"] + ')',
  };
}
//className="FarmerCard" 



export default FarmerCard

/*

<img className="FarmerImage" src={farmer.attributes.link} alt={farmer.attributes.name} />

*/