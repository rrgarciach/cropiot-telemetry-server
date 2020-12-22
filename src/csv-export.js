const csvExport = require('dynamodb-to-csv');

const CONFIG = require('./config');

csvExport({
  ...CONFIG.DYNAMODB.LOCAL,
  table: 'Telemetries',
  file: 'telemetries.csv',
});
