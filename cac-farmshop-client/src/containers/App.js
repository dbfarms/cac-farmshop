import React, { Component } from 'react';
//difference between react and react, component??
import './App.css';
import Carts from './carts'
import 'whatwg-fetch';

const API_URL = process.env.REACT_APP_API_URL;

debugger

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      carts: []
    }
  }

  componentDidMount() {
    //debugger
    //fetch('https://localhost:8081/api/carts')
      fetch(`${API_URL}/carts`)
      .then(response => response.json())
      .then(carts => this.setState({ carts }))
  }
  
  render() {
    
    return (
      <div className="App">
      <Carts carts={this.state.carts}/>
      </div>
    );
  }
}

export default App;

/*

    var obj = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'localhost:8081'
    },
    
    }
    fetch('https://localhost:8081/api/carts', obj)  
  .then(function(res) {
    return res.json();
   })
  .then(function(resJson) {
    return resJson;
   })
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

*/