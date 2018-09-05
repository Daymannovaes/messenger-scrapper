import React, { Component } from 'react';

export default (props) => (
    <div>
        <div>
            userId: {props.message.message_sender.id}
        </div>
        <div>
            message: {props.message.message.text}
        </div>
    </div>
);
