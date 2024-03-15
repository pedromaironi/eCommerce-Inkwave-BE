const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'yz57dw',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
