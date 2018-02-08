import React from 'react'
import { Route } from 'react-router-dom'

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
            onClick={() => { history.push('/farmgoods')}}
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
