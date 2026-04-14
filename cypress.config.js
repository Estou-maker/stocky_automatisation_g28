const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;


module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
env:{
  USER_EMAIL: 'EmployeeTestAuto',
  USER_PASSWORD: '123',
},
reporter: 'cypress-mochawesome-reporter',
  video: true,
    reporterOptions: {
      charts: true,
      reportPageTitle: 'test results',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true,
      html: true,
      overwrite: true,
      timestamp: 'mmddyyyy_HHMMss',
      reportDir: 'cypress/Reports/Mochawsome-report',
      
    },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return on ('file:preprocessor', cucumber())
      // implement node event listeners here
    },

    specPattern: 'cypress/e2e/**/*.feature'
  },
});
