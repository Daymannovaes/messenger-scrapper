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
            messages: [],
            showMessages: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userId !== nextProps.userId) this.setState({ messages: [] });
        if(!this.props.loading && nextProps.loading) return this.pool(nextProps);
    }

    pool = (props) => {
        const before = getBeforeTimestamp(this.state.messages) + 1;
        const { userId, cookies } = props;

        console.log(`pooling before ${before} from ${userId}`);

        fetchMessagesBefore({ userId, cookies, before })
            .then(this.setKeepPooling)
            .then(this.addMessages)
            .then(this.tryPoolAgain)
            .catch(this.props.onFetchComplete);
    }

    setKeepPooling = response => {
        this.keepPooling = this.props.loading && hasPreviousPage(response);

        return response;
    }

    addMessages = response => {
        if(!this.keepPooling) return response;

        const newMessages = response.nodes.filter(isTextMessage)
        const messages = uniqBy(
            newMessages.concat(this.state.messages), 'message_id'
        ).map(message => Object.assign(message, {
            received: get(message, 'message_sender.id') === this.props.userId,
            timestamp_precise: parseInt(message.timestamp_precise, 10)
        }));

        this.setState({ messages })
    }

    tryPoolAgain = () => {
        if(!this.keepPooling) return this.props.onFetchComplete();

        setTimeout(this.pool.bind(this, this.props), 0);
    }

    toggleShowMessages = () => this.setState({ showMessages: !this.state.showMessages })

    render() {
        return (
            <div>
                <Button onClick={this.toggleShowMessages}>{this.state.showMessages ? 'hide' : 'show'} {this.state.messages.length} messages</Button>

                <div>
                    {this.state.showMessages && this.state.messages.map(message => <Message key={message.message_id} message={message} />)}
                </div>
            </div>
        );
    }
}
