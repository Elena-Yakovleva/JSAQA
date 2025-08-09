const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://petstore.swagger.io/v2/",

    projectId: "3uytpf",
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
