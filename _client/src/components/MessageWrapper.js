import { get, uniqBy } from 'lodash';
import React, { Component } from 'react';

import Button from './Button';
import Message from './Message';

import { fetchMessagesBefore } from '../lib/facebook-fetch.js';
import { getBeforeTimestamp, isTextMessage, hasPreviousPage } from '../lib/facebook-message';

export default class MessageWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.loading && nextProps.loading) return this.startPooling(nextProps);
    }

    startPooling = (props) => {
        const before = getBeforeTimestamp(this.state.messages) + 1;
        const { userId, cookies } = props;

        fetchMessagesBefore({ userId, cookies, before })
            .then(this.checkForPoolAgain)
            .then(this.addMessages);
    }

    checkForPoolAgain = response => {
        this.keepPooling = this.props.loading && hasPreviousPage(response);

        return response;
    }

    addMessages = response => {
        if(!this.keepPooling) return response;

        const newMessages = response.nodes.filter(isTextMessage)
        const messages = uniqBy(newMessages.concat(this.state.messages), 'message_id');

        this.setState({ messages })
    }

    render() {
        return (
            <div>
                <div>messages fetched: {this.state.messages.length}</div>
                <Button onClick={this.toggleShowMessages}>show messages</Button>

                <div>
                    {this.state.messages.map(message => <Message key={message.message_id} message={message} />)}
                </div>
            </div>
        );
    }
}
