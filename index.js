const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'xxx',
  secretAccessKey: process.env.AWS_SECRET_KEY || 'xxx',
  endpoint: process.env.DYNAMODB_HOST,
});

const PORT = process.env.PORT;
const TOPICS = {
  V1: {
    DEVICES: {
      TELEMETRY: '/v1/devices/telemetry',
    },
  },
};
let client;

server.listen(PORT, function () {
  console.info(`MQTT server started and listening on port ${PORT}`);
  aedes.subscribe('test', function(packet, cb) {
    console.log('Published', packet.payload.toString());
  });
});

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'Telemetries',
  Item: {
    id: uuidv4(),
    ph: 7.6,
    device: 'ph_sensor_01',
    datetime: Date.now(),
  }
};

docClient.put(params, function(err, data) {
  if (err) {
    console.error('Unable to add Telemetry', '. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('PutItem succeeded:', data);
  }
});

