const {PERSISTENT, LAUNCH, SERVER} = require('jest-playwright-preset');

const fs = require('fs');
const path = require('path');

const wsEndpointFileName = path.join(__dirname, 'wsEndpoint.txt');

const config = {
  browsers: ["chromium"],
  // browsers: ["firefox"],
  launchOptions: {
    headless: false,
  },
}

if (fs.existsSync(wsEndpointFileName)) {
  const wsEndpoint = fs.readFileSync(path.join(__dirname, 'wsEndpoint.txt'), {encoding: 'UTF8'});
  console.log('wsEndpoint retrieved', wsEndpoint);

  Object.assign(config, {
    launchType: SERVER,
    connectOptions: {wsEndpoint},
  })
}

module.exports = config;