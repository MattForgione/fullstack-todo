function dashboardSignPost() {
  return cy.get('h1.module-title--title').contains('Dashboard');
}

function loginPageSignPost() {
  return cy.get('mat-card-title').contains('Login');
}

function login() {
  cy.visit('/');
  cy.get('mat-label')
    .contains('Email')
    .click()
    .type('supersecretemail@mail.com');
  cy.get('mat-label').contains('Password').click().type('Testing12#');
  cy.get('span').contains('Login!').click();
}

describe('Initial login using test database', () => {
  it('Login should be successful', () => {
    login();
    dashboardSignPost();
    cy.getCookie('authToken');

    // logout works and deletes token
    cy.contains('Logout').click();
    loginPageSignPost();
    cy.getCookie('authToken').should('not.exist');
  });

  it('Brings you to dashboard when refresh after login', () => {
    login();
    cy.wait(1000);
    cy.reload();
    dashboardSignPost();
  });

  it('brings you to login page after login->logout->refresh', () => {
    login();
    dashboardSignPost();
    cy.contains('Logout').click();

    cy.reload();
  });
});
