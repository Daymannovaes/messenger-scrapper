'use strict';
const fetch = require('node-fetch');

module.exports.fetch = async (event, context) => {
    return fetch('https://www.google.com').then(res => res.text()).then(body => {
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'Go Serverless v1.0! Your function executed successfully!',
              input: event,
              body: body,
            }),
          };
    });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
