import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserForm from './components/UserForm';
import MessageWrapper from './components/MessageWrapper';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: '',
            cookies: '',
            fb_dtsg: '',
            error: ''
        };
    }

    handleSubmit = ({ userId, cookies, fb_dtsg }) => {
        this.setState({
            userId,
            cookies,
            fb_dtsg,
            error: '',
            loading: true
        });
    }

    handleCancel = event => {
        this.setState({ loading: false });
    }

    handleComplete = (error) => {
        this.handleCancel();

        if(error) this.setState({ error });
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my Messenger Scrapper</h1>
        </header>
        <UserForm loading={this.state.loading} onCancel={this.handleCancel} onSubmit={this.handleSubmit} />

        <MessageWrapper onFetchComplete={this.handleComplete} userId={this.state.userId} cookies={this.state.cookies} loading={this.state.loading} fb_dtsg={this.state.fb_dtsg} />

        {this.state.error.toString()}
      </div>
    );
  }
}

export default App;
