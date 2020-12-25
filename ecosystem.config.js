const config = {
  production: {
    apps: [
      {
        name: 'mqtt',
        script: './index.js',
        exec_mode: 'fork',
        merge_logs: true,
        time: true,
        autorestart: true
      },
      {
        name: 'cron',
        script: 'git pull && pm2 restart mqtt',
        exec_mode: 'fork',
        cron_restart: '* * * * *',
        time: true,
        autorestart: false
      }
    ]
  },
  development: {
    apps: [
      {
        name: 'mqtt',
        script: './index.js',
        exec_mode: 'fork',
        watch: true,
        ignore_watch: [
          '.git/',
          '.git/**',
          '.idea',
          '.pm2',
          '**/spec/*.yaml',
          'migrations',
          './node_modules',
          '.config',
          '.ngrok',
          '*.sqlite*',
        ],
        time: true,
      },
      {
        name: 'cronjob',
        script: './cronjob.js',
        exec_mode: 'fork',
        merge_logs: true,
        time: true,
        autorestart: false,
      }
    ]
  },
};

module.exports = config[process.env.NODE_ENV || 'development'];
