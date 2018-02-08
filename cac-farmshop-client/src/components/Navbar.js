import React from 'react'
import { Route } from 'react-router-dom'
import '../containers/App.css'

const Navbar = () =>
    <div className="navbar">
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
