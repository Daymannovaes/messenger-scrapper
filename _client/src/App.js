import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserForm from './components/UserForm';
// import { fetchMessagesBefore } from './lib/facebook-fetch.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: '',
            cookies: ''
        };
    }

    handleSubmit = ({ userId, cookies }) => {
        this.setState({ loading: true });
        this.setState({ userId, cookies });

        // fetchMessagesBefore({ userId, cookies }).then(messages => this.setState({ messages }));
    }

    handleCancel = event => {
        this.setState({ loading: false });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my Messenger Scrapper</h1>
        </header>
        <UserForm loading={this.state.loading} onCancel={this.handleCancel} onSubmit={this.handleSubmit} />

        {this.state.userId}
        {this.state.cookies}
      </div>
    );
  }
}

export default App;
