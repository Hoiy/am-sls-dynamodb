'use strict';

const AWS = require('aws-sdk');

module.exports.main = (event, context, callback) => {
    const body = JSON.parse(event.body)
    const dynamoDb = new AWS.DynamoDB.DocumentClient()

    const data = body.data
    data.updatedAt = new Date().getTime();

    const params = {
        TableName: body.tableName || 'am-default',
        Item: data
    };

    dynamoDb.put(params, (error, data) => {
        if (error) {
            callback(error)
            return
        }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        })
    })
}
