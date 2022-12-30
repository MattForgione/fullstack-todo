import { MailSlurp } from 'mailslurp-client';
import { mount } from 'cypress/angular';

const apiKey = Cypress.env('mailslurp_key');
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add('createInbox', () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add('waitForLatestEmail', inboxId => {
  const timeoutMillis = 30_000;
  return mailslurp.waitForLatestEmail(inboxId, timeoutMillis);
});

Cypress.Commands.add('loginFlow', (email: string, password: string) => {
  cy.visit('/');
  cy.get('mat-label').contains('Email').click().type(email);
  cy.get('mat-label').contains('Password').click().type(password);
  cy.get('span').contains('Login!').click();
});

Cypress.Commands.add('mount', mount);
