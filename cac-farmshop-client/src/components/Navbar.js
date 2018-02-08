import React from 'react'
import { Router, Route } from 'react-router-dom'

const Navbar = () =>
    <div>
      <Route render={({history}) => (
        <div>
          <button
            className="nav-button"
            onClick={() => { history.push('/')}}
            >
              Home
          </button>
          <button
            className="nav-button"
            onClick={() => { history.push('/farmers')}}
            >
              Farmers
          </button>
          <button
            className="nav-button"
            onClick={() => { history.push('/farm-goods')}}
            >
              Farm Goods
          </button>
          <button
            className="nav-button"
            onClick={() => { history.push('/cart')}}
            >
              Cart
          </button>
        </div>
       )} />
    </div>

export default Navbar

/*
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = props => {
  return (
    <div style={{ borderBottom: '2px solid black', paddingBottom: '10px', marginBottom: '12px' }}>
      <NavLink
        style={{ marginRight: '10px' }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={{ marginRight: '10px' }}
        to="/movies"
      >
        Movies
      </NavLink>
      <NavLink
        style={{ marginRight: '10px' }}
        to="/movies/new"
      >
        Add Movie
      </NavLink>
    </div>
  );
}

export default Navbar

*/
