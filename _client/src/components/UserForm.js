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
        this.state = {
            userId: '',
            cookies: '',
            fb_dtsg: ''
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit && this.props.onSubmit(this.state);
    }

    handleCancel = event => {
        event.preventDefault();

        this.props.onCancel(event);
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                userId <LocalStorageInput name="userId" placeholder="userId" onChange={this.handleChange} />
                &nbsp;
                cookies <LocalStorageInput name="cookies" placeholder="cookies" onChange={this.handleChange} />
                &nbsp;
                fb_dtsg <LocalStorageInput name="fb_dtsg" placeholder="fb_dtsg" onChange={this.handleChange} />

                <Button disabled={this.props.loading}>{this.props.loading ? 'Loading...' : 'Submit'}</Button>
                <Button disabled={!this.props.loading} onClick={this.handleCancel}>Stop</Button>
            </Form>
        );
    }
}
