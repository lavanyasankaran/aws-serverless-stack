import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDB from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };
  await dynamoDB.put(params);
  return params.Item;
});

/*import * as uuid from "uuid";
import AWS from "aws-sdk";
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,

    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  dynamoDB.put(params, (error, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    };
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false }),
      };
      callback(null, response);
      return;
    }

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
}*/
