import React from 'react';
import { Link } from 'react-router-dom';

const FarmersList = ({ farmers }) => {
  const renderFarmers = farmers.map(farmer =>
    <Link style={{ marginRight: '12px'}} key={farmer.id} to={`/farmers/${farmer.id}`}>{farmer.name}</Link>
  );

  return (
    <div>
      {renderFarmers}
    </div>
  );
};

export default FarmersList;
