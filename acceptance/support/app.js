const _ = require('lodash');
const Bluebird = require('bluebird');
const fork = require('child_process').fork;
const supertest = require('supertest');

function server() {
  let serverChildProcess;

  function up() {
    return new Bluebird((resolve, reject) => {
      let resolved = false;
      serverChildProcess = fork('./server.js', [], { silent: true, env: process.env });

      serverChildProcess.on('message', message => {
        if (message.status === 'listening') {
          resolved = true;
          resolve();
        }
      });

      serverChildProcess.on('close', (code, signal) => {
        if (!resolved) {
          reject(new Error(`server process exited with code ${code} signal ${signal}`));
          return;
        }

        // Spawn processes with SIGTERM return null code
        if (_.isNull(code) && signal.toString() === 'SIGTERM') {
          return;
        }

        if (code !== 0) {
          console.info(`server process exited with code ${code} signal ${signal}`);
        }
      });

      serverChildProcess.on('error', err => {
        console.error({ error: err });
      });
    });
  }

  function down() {
    return new Bluebird(resolve => {
      if (serverChildProcess) {
        serverChildProcess.kill('SIGTERM');
      }

      serverChildProcess.on('close', () => {
        serverChildProcess = undefined;
        resolve();
      });
    });
  }

  return {
    up,
    down,
    api: supertest('http://localhost:3001')
  };
}

const app = server();

module.exports = app;
