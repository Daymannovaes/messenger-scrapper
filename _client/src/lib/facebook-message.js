const _ = require('lodash');

export const getMessagesFromPayload = (payload) => _.get(payload, 'o0.data.message_thread.messages.nodes');
export const hasPreviousPage = payload => _.get(payload, 'o0.data.message_thread.messages.page_info.has_previous_page');
export const getBeforeFromPayload = payload => _.get(payload, 'o0.data.message_thread.messages.nodes[0].timestamp_precise');
