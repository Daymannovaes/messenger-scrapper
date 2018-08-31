import React, { Component } from 'react';
import LocalStorageInput from './LocalStorageInput';

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit && this.props.onSubmit(this.state);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <LocalStorageInput name="userId" placeholder="this is an input" onChange={this.handleChange} />

                <button>Submit</button>
            </form>
        );
    }
}
