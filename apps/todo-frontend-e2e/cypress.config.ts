import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

export default defineConfig({
  requestTimeout: 30000,
  e2e: {
    ...nxE2EPreset(__dirname),
    baseUrl: 'http://localhost:4200',
    supportFile: false,
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
