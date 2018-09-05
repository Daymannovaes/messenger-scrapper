const { get } = require('lodash');

export const hasPreviousPage = response => get(response, 'page_info.has_previous_page', false);

export const getBeforeTimestamp = messages => parseInt(
    get(messages, '[0].timestamp_precise', new Date().getTime()),
    10
)

export const isTextMessage = message => !!get(message, 'message.text');
