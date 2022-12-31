function clickFirstTodoList() {
  cy.get('.todo-list-index--list-item--text')
    .should('contain', firstTodoListTitle)
    .click();
}

function firstTodoSignPost() {
  cy.get('mat-card-title').contains('My First Todo List').should('exist');
}

const firstTodoListTitle = 'My First Todo List';
let password = 'Testing12#4';
let emailAddress: string;

describe('dashboard tests', () => {
  context('does dashboard tests', () => {
    before(() => {
      cy.task('getUserEmail').then((user: any) => {
        cy.log(user.email);
        cy.log(user.pass);
        emailAddress = user.email;

        expect(emailAddress).to.be.a('string');
        cy.loginFlow(emailAddress, password);
      });
    });

    it('creates a todo list', () => {
      cy.get('#create-todo-list').click();
      cy.get('mat-label').contains('Todo List Title').type(firstTodoListTitle);
      cy.get('span').contains('Create!').click();
      cy.get('p').should('contain', firstTodoListTitle);
    });

    it('checks if selected todo-list title displays', () => {
      clickFirstTodoList();
      firstTodoSignPost();
    });

    xit('checks if todo-list content is shown upon clicking the individual todo', () => {
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
});
