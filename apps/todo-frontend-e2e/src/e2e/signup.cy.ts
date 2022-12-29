describe('Sign up', () => {
  context('First sign up', () => {
    it('can load the sign up form', () => {
      cy.visit('/auth/signup');
      cy.contains('Sign Up');

      cy.createInbox().then(inbox => {
        assert.isDefined(inbox);
      });
    });
  });
});
