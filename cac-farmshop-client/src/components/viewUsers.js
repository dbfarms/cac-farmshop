import React from 'react';

const ViewUsers = ({ usersList }) => {
  return usersList.map(user => {
      //debugger 
    return Object.entries(user.attributes).map(function(keyName, keyIndex) {
        //debugger
        if (keyName[0] === 'farmer') {
            return (
            <div className="keyName"> 
            <label>Farm Name: {keyName[1].name}</label>
            <label>Address: {keyName[1].address}</label>
            </div>
            )
        } else if (keyName[0] === 'customer') {
            debugger 
        } else {
            return (<div className="keyName">
                <label>{keyName[0]}: {keyName[1]}</label>
            </div>)
        }
    })
  }
)}

export default ViewUsers

/*

  <div key={farmer.id} className="FarmerCard">
      <h3>{farmer.name}</h3>
      <img className="FarmerImage" src={farmer.img_url} alt={farmer.name} />
      <p>{farmer.address}</p>
  </div>

*/


