import React from 'react';

const ViewUsers = ({ usersList }) => {
    return usersList.map(farmer => {
        return (
            <div className="keyName"> 
            <label>Farm Name: {farmer.name}</label>
            <br />
            <label>Address: {farmer.address}</label>
            <br />
            <label>Order History </label>
            </div>
        )
    })
}

export default ViewUsers


/*
import React from 'react';

const ViewUsers = ({ usersList }) => {
    //debugger
    //debugger 
    return Object.entries(usersList).map(function(keyName, keyIndex) {
        if (keyName[0] === 'farmers') {
            //debugger 
            return keyName[1].map(farmer => {
                return (
                <div className="keyName"> 
                <label>Farm Name: {farmer.name}</label>
                <br />
                <label>Address: {farmer.address}</label>
                <br />
                <label>Order History </label>
                </div>)
            }) 
        } else if (keyName[1] === 'customers') {
            //debugger 
            return keyName[1].map(customer => {
                return (
                    <div className="keyName">
                    <label>Name: {customer.first_name + ' ' + customer.last_name}</label>
                    <br />
                    <label>Email: {customer.email}</label>
                    <br />
                    <label>Orders: </label>
                    </div>  
                )  
            })
        }
    })
}

export default ViewUsers


///

if (usersList.farmers != undefined ) {  
    //debugger 
    
  } else {
      return (
          <div>
              <p>loading users</p>
            </div>
      )
  }

//
import React from 'react';

const ViewUsers = ({ usersList }) => {
    debugger 
  if (usersList.data != undefined ) {  
    //debugger 
    return usersList.data.map(user => {
        //debugger 
        return Object.entries(user.attributes).map(function(keyName, keyIndex) {
            //debugger
            if (keyName[0] === 'farmer') {
                //debugger 
                return (
                <div className="keyName"> 
                <label>Farm Name: {keyName[1].name}</label>
                <label>Address: {keyName[1].address}</label>
                </div>
                )
            } else {
                //debugger
                return (<div className="keyName">
                    <label>{keyName[0]}: {keyName[1]}</label>
                </div>)
            }
        })
    })
  } else {
      return (
          <div>
              <p>loading users</p>
            </div>
      )
  }
}

export default ViewUsers

/*

  <div key={farmer.id} className="FarmerCard">
      <h3>{farmer.name}</h3>
      <img className="FarmerImage" src={farmer.img_url} alt={farmer.name} />
      <p>{farmer.address}</p>
  </div>

*/


