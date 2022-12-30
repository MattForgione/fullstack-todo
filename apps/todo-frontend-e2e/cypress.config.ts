import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import webpackConfig from './cypress.webpack.config';

const webpackPreprocessor = require('@cypress/webpack-preprocessor');

export default defineConfig({
  requestTimeout: 30000,
  watchForFileChanges: false,
  e2e: {
    ...nxE2EPreset(__dirname),
    setupNodeEvents(on) {
      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: webpackConfig,
        })
      );
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
