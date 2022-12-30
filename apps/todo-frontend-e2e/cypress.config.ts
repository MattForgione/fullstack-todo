import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import webpackConfig from './cypress.webpack.config';
import { makeEmailAccount } from './src/plugins/email-account';

const webpackPreprocessor = require('@cypress/webpack-preprocessor');

export default defineConfig({
  requestTimeout: 30000,
  watchForFileChanges: false,
  e2e: {
    ...nxE2EPreset(__dirname),
    async setupNodeEvents(on) {
      const emailAccount = await makeEmailAccount();

      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: webpackConfig,
        })
      );

      on('task', {
        getUserEmail() {
          return emailAccount.user;
        },

        getLastEmail() {
          return emailAccount.getLastEmail();
        },

        sendEmail() {
          return emailAccount.sendEmail();
        },
      });
    },
    baseUrl: 'http://localhost:4200',
    supportFile: './src/support/index.ts',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
