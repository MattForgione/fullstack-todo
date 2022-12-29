import { MailSlurp } from 'mailslurp-client';
import { mount } from 'cypress/angular';

// TODO: move apiKey to its own .env file
const apiKey = '';
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add('createInbox', () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add('waitForLatestEmail', inboxId => {
  const timeoutMillis = 30_000;
  return mailslurp.waitForLatestEmail(inboxId, timeoutMillis);
});

Cypress.Commands.add('mount', mount);
