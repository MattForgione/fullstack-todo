describe('Sign up flow based tests using ethereal and nodemailer', () => {
  let userEmail;

  context('Account creation testing', () => {
    before(() => {
      cy.task('getUserEmail').then((user: any) => {
        cy.log(user.email);
        cy.log(user.pass);
        expect(user.email).to.be.a('string');
        userEmail = user.email;
      });
    });
  });
});
