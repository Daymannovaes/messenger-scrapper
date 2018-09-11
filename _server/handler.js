const fetch = require('node-fetch');
const { fetchMessagesBefore } = require('./facebook-fetch');

module.exports.fetch = async (event, context) => {
    const queryStringParameters = event.queryStringParameters || {};
    const { before, cookies, userId, fb_dtsg } = queryStringParameters;

    if(!cookies || !userId || !fb_dtsg) {
        return Response(400, {
            message: "missing cookies or userId or fb_dtsg as parameter in query string"
        });
    }

    return fetchMessagesBefore({ before, cookies, userId, fb_dtsg })
    .then(res => Response(200, res))
    .catch(error => Response(400, {
        message: error.toString(),
    }));
};

const Response = (statusCode, body) => ({
    statusCode,
    headers: {
        "Access-Control-Allow-Origin" : "*",
    },
    body: JSON.stringify(body)
});
