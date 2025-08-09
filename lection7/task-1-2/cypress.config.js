const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://qamid.tmweb.ru",

    viewportWidth: 1366,
    viewportHeight: 768,

    projectId: "h95bh2",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
