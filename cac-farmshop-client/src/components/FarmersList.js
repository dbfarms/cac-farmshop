import React from 'react';
import { Link, Route } from 'react-router-dom';
import FarmerShow from '../containers/FarmerShow';
import FarmerCard from '../components/farmerCard'

var farmerId = undefined 

//debugger

const FarmersList = ({ farmers }) => {
  //debugger
  const renderFarmers = farmers.map((farmer, index) =>{
    //debugger
    //<button key={index} className="farm-button" onClick={() => changeFarmer(farmer.id)}>{farmer.name}</button>
    //<Link style={{ marginRight: '12px'}} key={farmer.id} to={`/farmers/${farmer.id}`}>{farmer.name}</Link>
    return <FarmerCard key={index} farmer={farmer} />
  }
  );

  //does this do anything? doesn't look like it it does anymore...
  const changeFarmer = (farmerId) => {
    //console.log(farmerId);
    farmerId = farmerId
    console.log(farmerId)
  }

  //

  return (
    <div>
      {renderFarmers}
      
    </div>
  );
};

export default FarmersList;



/*

//  <Route path="/:farmerId" component={FarmerShow}/>
*/