const fetch = require('node-fetch');
const { fetchMessagesBefore } = require('./facebook-fetch');

module.exports.fetch = async (event, context) => {
    const queryStringParameters = event.queryStringParameters || {};
    const { before, cookies, userId } = queryStringParameters;

    if(!cookies || !userId) return {
        statusCode: 400,
        body: JSON.stringify({
            message: "missing cookies or userId as parameter in query string"
        })
    };

    return fetchMessagesBefore({ before, cookies, userId })
    .then(res => ({
        statusCode: 200,
        body: res
    }))
    .catch(error => ({
        statusCode: 400,
        body: JSON.stringify({
            message: error.toString(),
        })
    }));
};
