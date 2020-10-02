const fs = require('fs');
const path = require('path');
const {chromium} = require('playwright');  // Or 'webkit' or 'firefox'.

const wsEndpointFileName = path.join(__dirname, 'wsEndpoint.txt');
let browserServer;


function exitHandler() {
  console.log('Exit e2e:browser', wsEndpointFileName);
  browserServer.close();
  fs.unlinkSync(wsEndpointFileName);
  process.exit();
}

process.on('SIGINT', exitHandler);
process.on('uncaughtException', exitHandler);

(async() => {
  browserServer = await chromium.launchServer({headless: false});
  //   const browserServer = await chromium.launch();
  const wsEndpoint = browserServer.wsEndpoint();
  fs.writeFileSync(wsEndpointFileName, wsEndpoint, {encoding: 'UTF8'});
  console.log('wsEndpoint', wsEndpoint);
  // Use web socket endpoint later to establish a connection.
  const browser = await chromium.connect({wsEndpoint});

  const context = await browser.newContext();
  const page = await context.newPage();
  //   await page.goto('http://whatsmyuseragent.org/');

  // Close browser instance.
  //   await browserServer.close();
})();
