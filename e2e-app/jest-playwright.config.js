const {PERSISTENT, LAUNCH} = require('jest-playwright-preset');

module.exports = {
  browsers: ["chromium"],
  // browsers: ["firefox"],
  launchOptions: {
    headless: false,
  },
}