module.exports = {
  SQLITE: {
    LOCAL: {
      FILENAME: process.env.FILENAME || 'telemetries_db.sqlite',
    },
  },
  MYSQL: {
    LOCAL: {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'cropiot',
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
