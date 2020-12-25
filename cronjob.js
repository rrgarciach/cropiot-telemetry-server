const {exec} = require('child_process');

const SECONDS_TO_RESTART = 10;

triggerTimeout();

function checkForChanges() {
  exec('git pull', (error, stdout, stderr) => {
    triggerTimeout();
    if (error) return console.log(`error: ${error.message}`);
    if (stderr) return console.log(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
  });
}

function triggerTimeout() {
  const timeout = SECONDS_TO_RESTART * 1000;
  setTimeout(checkForChanges, timeout);
}
