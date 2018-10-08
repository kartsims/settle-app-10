import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is some generic react UI Sample</h1>
        </header>
        <p className="App-intro">
          Below you will find responses from the interactions with API's:
        </p>
      </div>
    );
  }
}

export default App;
