describe('initial flow', () => {
  it('should log in', () => {
    cy.visit('/');
    cy.get('mat-label')
      .contains('Email')
      .click()
      .type('supersecretemail@mail.com');
    cy.get('mat-label').contains('Password').click().type('Testing12#');
    cy.get('span').contains('Login!').click();

    // should be in dashboard
    cy.get('h1.module-title--title').contains('Dashboard');

    // click first todo-list
    cy.get('.todo-list-index--list-item--text').click();

    // refresh the page
    cy.reload();
  });
});
