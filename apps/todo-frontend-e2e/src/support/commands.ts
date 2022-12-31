import { mount } from 'cypress/angular';

Cypress.Commands.add('loginFlow', (email: string, password: string) => {
  cy.visit('/');
  cy.get('mat-label').contains('Email').click().type(email);
  cy.get('mat-label').contains('Password').click().type(password);
  cy.get('span').contains('Login!').click();
});

Cypress.Commands.add('mount', mount);
