import React from 'react';
import { Link } from 'react-router-dom';
import FarmerCard from './FarmerCard'
import Navbar from '../components/Navbar'

export default (props) => {
  //debugger
  const farmers = props.farmers.map(farmer =>
    <div>
      <li key={farmer.id}>
        <Link to={`/farmers/${farmer.id}`}>{farmer.name}</Link>
      </li>
      <li>
         <FarmerCard  key={farmer.id} farmer={farmer} />
      </li>
    </div>
  );

  return (
    <div>
    <Navbar />
      <div className='col-md-4'>
        <ul>
          {farmers}
        </ul>
      </div>
    </div>
  );
};
