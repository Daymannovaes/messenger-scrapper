import React, { Component } from 'react';
import styled from 'styled-components';
import LocalStorageInput from './LocalStorageInput';
import Button from './Button';

const Form = styled.form`
    margin: 12px;
`;

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
            <Form onSubmit={this.handleSubmit}>
                <LocalStorageInput name="userId" placeholder="this is an input" onChange={this.handleChange} />

                <Button>Submit</Button>
            </Form>
        );
    }
}
