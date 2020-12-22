module.exports = {
  SQL: {
    LOCAL: {
      FILENAME: process.env.FILENAME || 'telemetries_db.sqlite'
    },
  },
  DYNAMODB: {
    LOCAL: {
      accessKeyId: 'xxx',
      secretAccessKey: 'xxx',
      endpoint: process.env.LOCAL_DYNAMODB_HOST,
    },
    REMOTE: {
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  },
};
