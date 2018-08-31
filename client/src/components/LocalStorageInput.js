import React, { Component } from 'react';
import Input from './Input';

export default class LocalStorageInput extends Component {
    constructor(props) {
        super(props);

        this.STORAGE_NAME = `messenger_scrapper.components.${props.name}`;

        this.state = {
            value: this.getLocalStorageValue() || props.initialValue || ''
        };

        this.props.onChange({
            target: {
                value: this.state.value,
                name: props.name
            }
        });
    }

    getLocalStorageValue = () => localStorage.getItem(this.STORAGE_NAME)

    handleChange = event => {
        const { value } = event.target;

        this.setState({ value });
        localStorage.setItem(this.STORAGE_NAME, value);

        this.props.onChange && this.props.onChange(event);
    }

    render() {
        return <Input {...this.props} value={this.state.value} name={this.props.name} onChange={this.handleChange} />;
    }
}

