const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'xxx',
  secretAccessKey: 'xxx',
  endpoint: process.env.LOCAL_DYNAMODB_HOST,
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
