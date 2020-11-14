const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'xxx',
  secretAccessKey: process.env.AWS_SECRET_KEY || 'xxx',
  endpoint: process.env.DYNAMODB_HOST,
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName : 'Telemetries',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH'},  //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err)
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  else
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
});
