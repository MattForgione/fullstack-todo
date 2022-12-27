function clickFirstTodoList() {
  cy.get('.todo-list-index--list-item--text').click();
  cy.url().should('include', '/todo-list/1');
}

function firstTodoSignPost() {
  cy.get('mat-card-title').contains('My First Todo List').should('exist');
}

describe('dashboard tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('mat-label')
      .contains('Email')
      .click()
      .type('supersecretemail@mail.com');
    cy.get('mat-label').contains('Password').click().type('Testing12#');
    cy.get('span').contains('Login!').click();

    cy.get('h1.module-title--title').contains('Dashboard');
    cy.url().should('include', '/');
  });

  it('checks if selected todo-list title displays', () => {
    clickFirstTodoList();
    firstTodoSignPost();
  });

  it('checks if todo-list content is shown upon clicking the individual todo', () => {
    clickFirstTodoList();
    firstTodoSignPost();

    cy.get('mat-expansion-panel')
      .should('have.length', 2)
      .eq(0)
      .click()
      .find('p.todo-content')
      .should('be.visible');

    cy.get('mat-expansion-panel')
      .eq(1)
      .find('p.todo-content')
      .should('not.be.visible');
  });
});
