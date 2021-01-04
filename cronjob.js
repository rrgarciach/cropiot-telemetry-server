require('dotenv').config();
const {exec} = require('child_process');

const SECONDS_TO_RESTART = process.env.SECONDS_TO_RESTART || 3600;

function checkForChanges() {
  console.info('CRON_JOB: Updating code...');
  exec('git pull', (error, stdout, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
    if (stdout.includes('Unpacking objects:')) restartProcesses();
    else triggerTimeout();
  });
}

function triggerTimeout() {
  const timeout = SECONDS_TO_RESTART * 1000;
  setTimeout(checkForChanges, timeout);
}

function restartProcesses() {
  console.info('CRON_JOB: Restarting all processes...');
  exec('pm2 restart all', (error, stdout, stderr) => {
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
  });
}

triggerTimeout();
process.stdin.resume();
