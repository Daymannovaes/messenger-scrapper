const fetch = require('node-fetch');

const FACEBOOK_URL = "https://www.messenger.com/api/graphqlbatch/";

module.exports.fetchMessagesBefore = function({ userId, cookies, before }) {
    return fetch(FACEBOOK_URL, {
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cookies": cookies
        },
        "body":`queries=%7B%22o0%22%3A%7B%22doc_id%22%3A%222196887863716136%22%2C%22query_params%22%3A%7B%22id%22%3A%22${userId}%22%2C%22message_limit%22%3A201%2C%22load_messages%22%3Atrue%2C%22load_read_receipts%22%3Atrue%2C%22before%22%3A${before}%7D%7D%7D&fb_dtsg=AQGEhcU1Yc2j%3AAQFezC0IPaVO`,
        "method":"POST",
    })
    .then(res => res.text())
    .then(res => res.replace(`{
   "successful_results": 1,
   "error_results": 0,
   "skipped_results": 0
}`, ''))
    .then(res => JSON.parse(res))
    .then(res => {
        console.log(`done fetch ${before}`);
        return res;
    });
}
