import React from 'react';
import CustomerFarmGoodModal from './customerFarmgoodModal';

const customerFarmgoodModals = ({ farmgoods }) =>

<div>
    {farmgoods.map(farmGood => {
        <li>
        <CustomerFarmGoodModal key={farmGood.id} farmGood={farmGood} />)
        </li>
        })
    }
</div> 

export default customerFarmgoodModals
