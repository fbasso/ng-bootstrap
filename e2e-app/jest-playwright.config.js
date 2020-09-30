const {PERSISTENT, LAUNCH} = require('jest-playwright-preset');

module.exports = {
  // browsers: ["chromium"],
  // browsers: ["firefox"],
  // browsers: ["webkit"],
  browsers: ["chromium", "firefox"],
  launchOptions: {
    headless: false,
  },
}