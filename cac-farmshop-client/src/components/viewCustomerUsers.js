import React from 'react';

const ViewCustomerUsers = ({ customersList }) => {
    //debugger 
    return customersList.map(customer => {
        return (
            <div className="keyName"> 
            <label>Customer Name: {customer.first_name + ' ' + customer.last_name}</label>
            <br />
            <label>Email: {customer.email}</label>
            <br />
            <label>Orders: </label>
            </div>
        )
    })
}


export default ViewCustomerUsers
