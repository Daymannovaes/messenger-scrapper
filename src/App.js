import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import LocalStorageInput from './components/LocalStorageInput';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange = event => {
        this.setState({ value: event.target.value });
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my Messenger Scrapper</h1>
        </header>
        <LocalStorageInput name="localStorageTest" placeholder="this is an input" onChange={this.handleChange} />

        {this.state.value}
      </div>
    );
  }
}

export default App;
