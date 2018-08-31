const _ = require('lodash');

module.exports.getMessagesFromPayload = (payload) => _.get(payload, 'o0.data.message_thread.messages.nodes');
module.exports.hasPreviousPage = payload => _.get(payload, 'o0.data.message_thread.messages.page_info.has_previous_page');
module.exports.getBeforeFromPayload = payload => _.get(payload, 'o0.data.message_thread.messages.nodes[0].timestamp_precise');
