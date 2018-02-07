import React from 'react';
import { Link } from 'react-router';

export default (props) => {

  const farmers = props.farmers.map(farmer =>
    <li key={farmer.id}>
      <Link to={`/farmers/${farmer.id}`}>{farmer.name}</Link>
    </li>
  );

  return (
    <div>
      <div className='col-md-4'>
        <ul>
          {farmers}
        </ul>
      </div>
    </div>
  );
};
