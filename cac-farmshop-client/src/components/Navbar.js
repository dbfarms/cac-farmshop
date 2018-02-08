import React from 'react'

const Navbar = ({ changeView }) =>
    <div>
        <button className="nav-button" onClick={() => changeView('home')}>Home</button>
        <button className="nav-button" onClick={() => changeView('farmers')}>Farmers</button>
        <button className="nav-button" onClick={() => changeView('produce')}>Produce</button>
        <button className="nav-button" onClick={() => changeView('cart')}>Cart</button>

    </div>

export default Navbar
