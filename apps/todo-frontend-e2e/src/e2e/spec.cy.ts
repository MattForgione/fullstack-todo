describe('My First Test', () => {
  describe('Initial Login page tests', () => {
    it('Initial page should be the login page', () => {
      cy.visit('/');
      cy.get('mat-card-title').contains('Login');
    });

    it('Refreshing the page should give us the login page', () => {
      cy.visit('/');
      cy.reload();
      cy.get('mat-card-title').contains('Login');
    });
  });

  describe('Initial Signup page tests', () => {
    it('Clicking the Signup button brings us to the signup page', () => {
      cy.visit('/');
      cy.contains('Signup').click();
      cy.get('mat-card-title').contains('Sign Up');
    });

    it('Refreshing the page should give us the signup page', () => {
      cy.visit('/auth/signup');
      cy.reload();
      cy.get('mat-card-title').contains('Sign Up');
    });
  });
});
