import React, { Component } from 'react';
//difference between react and react, component??
import './App.css';
import Carts from './carts'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      carts: []
    }
  }

  render() {

    return (
      <div className="App">
      <Carts/>
      </div>
    );
  }
}

export default App;
