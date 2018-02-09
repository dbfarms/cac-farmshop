import React from 'react'

const farmNav = ({ changeFarmer }) => 
    <div>
        <button className="farm-button" onClick={() => changeForecast('currently')}>Current</button>
        <button className="farm-button" onClick={() => changeForecast('minutely')}>Minutely</button>
        <button className="farm-button" onClick={() => changeForecast('hourly')}>Hourly</button>
        <button className="farm-button" onClick={() => changeForecast('daily')}>Daily</button>
    
    </div>

export default Navbar 