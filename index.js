const uuid = require('uuid');
const AWS = require('aws-sdk');
const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const mqtt = require('mqtt');

const telemetriesSQLService = require('./src/services/telemetries.sql.service');

const CONFIG = require('./src/config');

const PORT = process.env.PORT;
const TOPICS = {
  TELEMETRY: '/v1/devices/me/telemetry',
};
const TYPES = {
  PH: 'ph',
};

let client;

console.log('Running on environment:', process.env.NODE_ENV);

server.listen(PORT, function () {
  console.info(`MQTT server started and listening on port ${PORT}`);
  aedes.subscribe(TOPICS.TELEMETRY, function(packet, cb) {
    console.log('Published', packet.payload.toString());
    try {
      const payload = JSON.parse(packet.payload.toString());
      // saveTelemetry(payload, CONFIG.DYNAMODB.LOCAL);
      // saveTelemetry(payload, CONFIG.REMOTE);
      telemetriesSQLService.insert(payload);
    } catch (err) {
      console.error(err);
    }
  });
  const client = mqtt.connect('mqtt://localhost');
  client.on('connect', function () {
    console.log('Connected');
    const payload = {
      id: uuid.v4(),
      type: TYPES.PH,
      value: (Math.floor(Math.random() * 6) + 1),
      device: 'ph_sensor_01',
      datetime: Date.now(),
    };
    client.publish(TOPICS.TELEMETRY, JSON.stringify(payload));
  });
});

function saveTelemetry(payload, config) {
  AWS.config.update(config);
  const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  const params = {
    TableName: 'Telemetries',
    Item: payload,
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Unable to add Telemetry', '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', data);
    }
  });
}
