import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
    background: ${props => props.message.received ? '#f1f0f0' : '#0084ff'};
    color: ${props => props.message.received ? 'black' : 'white'};
    margin: ${props => props.message.received ? '5px 0' : '5px 0 5px auto'};
    border-radius: 1.3em;
    max-width: 70%;
    width: fit-content;
    text-align: left;
    padding: 12px;
    word-wrap: break-word;
`;

const Time = styled.span`
    font-style: italic;
    color: #ccc;
    font-size: 70%;
    margin-left: 6px;
`;

export default (props) => (
    <Message {...props}>
        <span>{props.message.message.text}</span>
        <Time>{new Date(props.message.timestamp_precise).toLocaleString()}</Time>
    </Message>
);
