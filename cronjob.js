const {exec} = require('child_process');

const SECONDS_TO_RESTART = process.env.SECONDS_TO_RESTART || 3600;

triggerTimeout();

function checkForChanges() {
  console.info('CRON_JOB: Updating code and restarting all processes...');
  exec('git pull && pm2 restart all', (error, stdout, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
  });
}

function triggerTimeout() {
  const timeout = SECONDS_TO_RESTART * 1000;
  setTimeout(checkForChanges, timeout);
}
