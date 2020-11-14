const csvExport = require('dynamodb-to-csv');

// The config options are the same as your CLI options
csvExport({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'xxx',
  secretAccessKey: process.env.AWS_SECRET_KEY || 'xxx',
  endpoint: process.env.DYNAMODB_HOST,
  table: 'Telemetries',
  file: 'telemetries.csv',
});
