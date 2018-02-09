import React from 'react';
import { Link, Route } from 'react-router-dom';
import FarmerShow from '../containers/FarmerShow';

var farmerId = undefined 

//debugger

const FarmersList = ({ farmers }) => {
  //debugger
  const renderFarmers = farmers.map((farmer, index) =>
    //<button key={index} className="farm-button" onClick={() => changeFarmer(farmer.id)}>{farmer.name}</button>
    //<Link style={{ marginRight: '12px'}} key={farmer.id} to={`/farmers/${farmer.id}`}>{farmer.name}</Link>
    <FarmerShow key={index} farmer={farmer} />
  );

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

//  <Route path="/:farmerId" component={FarmerShow}/>

/*

<div>
              <Navbar changeForecast={this.handleForecastChange} />
              {forecastKey === 'currently' &&
                <div> 
                <h2>Current Forecast</h2>
                <CurrentForecast forecast={forecast} />
                </div>
              }
              {forecastKey === 'minutely' && <MinutelyForecast forecastData={forecast.data} />}
              {forecastKey === 'hourly' && 
                <div>
                <h2>Hourly Forecast</h2>
                {forecast.data.map((forecast, index) => <CurrentForecast key={index} forecast={forecast} />)}
                </div>
              }
              {forecastKey === 'daily' && <DailyForecast forecastData={forecast.data} />}
            </div>
          }



*/