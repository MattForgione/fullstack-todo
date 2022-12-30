const password = 'Testing12#';
let inboxId: string;
let emailAddress: string;
let verifyEmailLink: string;

describe('Sign up flow with verification', () => {
  context('Account creation testing', () => {
    it('can load the sign up form', () => {
      cy.visit('/auth/signup');
      cy.contains('Sign Up');

      cy.createInbox().then(inbox => {
        assert.isDefined(inbox);

        // save the inboxId for later checking the emails
        inboxId = inbox.id;
        emailAddress = inbox.emailAddress;

        // signup with inbox email address and the password;
        cy.get('mat-label').contains('Email').type(emailAddress);
        cy.get('mat-label').contains('Password').type(password);
        cy.get('mat-label').contains('Password Confirm').type(password);
        cy.get('span').contains('Sign Up!').click();
      });
    });

    it('can receive the confirmation email and click the link', () => {
      cy.waitForLatestEmail(inboxId).then(email => {
        assert.isDefined(email);

        const source = email.body as string;
        // @ts-ignore
        verifyEmailLink = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/.exec(
          source
        )[2];
        assert.isString(verifyEmailLink);
      });
    });

    it('can visit the link and verify the email', () => {
      cy.visit(verifyEmailLink);
      cy.get('h1.module-title--title').should('contain', 'Dashboard');
    });

    it('should be able to use the given credentials to login', () => {
      cy.contains('Logout').click();
      cy.get('mat-card-title').should('contain', 'Login');
      cy.get('mat-label')
        .contains('Email')
        .click()
        .type('supersecretemail@mail.com');
      cy.get('mat-label').contains('Password').click().type('Testing12#');
      cy.get('span').contains('Login!').click();
      cy.get('h1.module-title--title').should('contain', 'Dashboard');
    });

    it('should upon re-visiting link bring you to the expiry page', () => {
      cy.visit(verifyEmailLink);
      cy.get('p').should('contain', 'That link has expired...');
    });
  });
});
