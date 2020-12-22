const config = {
  production: {
    apps: [
      {
        name: 'api',
        script: './index.js',
        exec_mode: 'fork',
        merge_logs: true,
        time: true,
      },
    ]
  },
  development: {
    apps: [
      {
        name: 'api',
        script: './index.js',
        exec_mode: 'fork',
        watch: true,
        ignore_watch: [
          '.git/',
          '.idea',
          '.pm2',
          '**/spec/*.yaml',
          'migrations',
          './node_modules',
          '.config',
          '.ngrok',
        ],
        time: true,
      },
    ]
  },
};

module.exports = config[process.env.NODE_ENV || 'development'];
