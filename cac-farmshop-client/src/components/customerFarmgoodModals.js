import React from 'react';
import CustomerFarmGoodModal from './customerFarmgoodModal';

const customerFarmgoodModals = ({ farmgoods }) =>

<div>
    {farmgoods.map(farmGood => <CustomerFarmGoodModal key={farmGood.id} farmGood={farmGood} />)}
</div> 

export default customerFarmgoodModals
