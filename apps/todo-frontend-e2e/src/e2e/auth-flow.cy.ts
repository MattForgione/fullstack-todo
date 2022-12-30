const password = 'Testing12#';
const passwordReset = 'Testing12#4';
let inboxId: string;
let emailAddress: string;
let verifyEmailLink: string;
let passwordResetLink: string;

function dashboardSignPost() {
  return cy.get('h1.module-title--title').contains('Dashboard');
}

describe('Sign up flow with verification', () => {
  context('Account creation testing', () => {
    it('can load the sign up form and create inbox', () => {
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
      dashboardSignPost();
    });

    it('should, upon re-visiting sign in link, bring you to the expiry page', () => {
      cy.visit(verifyEmailLink);
      cy.get('p').should('contain', 'That link has expired...');
    });
  });

  context('Logging in using the verified account', () => {
    it('should be able to use the given credentials to login', () => {
      cy.loginFlow(emailAddress, password);
      dashboardSignPost();
    });
  });

  context('Authorization testing and refresh bugs', () => {
    it('Brings you to dashboard when refresh after login', () => {
      cy.loginFlow(emailAddress, password);
      cy.wait(250);
      cy.reload();
      dashboardSignPost();
    });

    it('brings you to login page after login->logout->refresh', () => {
      cy.loginFlow(emailAddress, password);
      dashboardSignPost();
      cy.contains('Logout').click();

      cy.reload();
      cy.get('mat-card-title').should('contain', 'Login');
    });
  });

  context('Password reset flow works', () => {
    it('should send a password reset email when email is passed to the reset form', () => {
      cy.visit('/');
      cy.get('a').contains('Click here to reset!').click();
      cy.get('mat-label').contains('Email').type(emailAddress);
      cy.get('span').contains('Send Email!').click();
    });

    it('should be able to visit the link, type in a new password, and submit, then log in', () => {
      cy.waitForLatestEmail(inboxId).then(email => {
        assert.isDefined(email);

        const source = email.body as string;
        // @ts-ignore
        passwordResetLink = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/.exec(
          source
        )[2];
        assert.isString(passwordResetLink);

        cy.visit(passwordResetLink);
        cy.get('mat-label').contains('Password').type(passwordReset);
        cy.get('mat-label').contains('Confirm Password').type(passwordReset);
        cy.get('span').contains('Reset!').click();

        cy.loginFlow(emailAddress, passwordReset);
        dashboardSignPost();
      });
    });
  });
});
