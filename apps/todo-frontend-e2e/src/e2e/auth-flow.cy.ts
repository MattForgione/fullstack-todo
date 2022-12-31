import { recurse } from 'cypress-recurse';

let password = 'Testing12#';
let passwordReset = 'Testing12#4';
let passwordResetLink: string;
let emailAddress: string;
let verifyEmailLink: string;

function dashboardSignPost() {
  return cy.get('h1.module-title--title').contains('Dashboard');
}

describe('Sign up flow based tests using ethereal and nodemailer', () => {
  context('Account creation testing', () => {
    before(() => {
      cy.task('getUserEmail').then((user: any) => {
        cy.log(user.email);
        cy.log(user.pass);
        emailAddress = user.email;

        expect(emailAddress).to.be.a('string');
      });
    });

    it('can load the sign up form and find valid verification email', () => {
      cy.visit('/auth/signup');
      cy.contains('Sign Up');

      // signup with inbox email address and the password;
      cy.get('mat-label').contains('Email').type(emailAddress);
      cy.get('mat-label').contains('Password').type(password);
      cy.get('mat-label').contains('Password Confirm').type(password);
      cy.get('span').contains('Sign Up!').click();

      cy.wait(5000);
      // email should exist
      recurse(() => cy.task('getLastEmail'), Cypress._.isObject, {
        timeout: 60000,
        delay: 5000, // wait 5 seconds between attempts
      })
        .its('html')
        .then((html: string | null) => {
          if (html) {
            verifyEmailLink = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/.exec(
              html
            )![2];
            expect(verifyEmailLink).to.be.a('string');
          } else {
            throw new TypeError('HTML source is nullish');
          }
        });
    });

    it('can visit the verification link and verify the email', () => {
      cy.visit(verifyEmailLink);
      cy.wait(250);

      dashboardSignPost();
    });

    it('upon revisiting the verification link, it should take you to the link expired page', () => {
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
      cy.wait(5000);
    });

    it('should be able to visit the link, type in a new password, and submit, then log in', () => {
      // email should exist
      recurse(() => cy.task('getLastEmail'), Cypress._.isObject, {
        timeout: 60000,
        delay: 5000, // wait 5 seconds between attempts
      })
        .its('html')
        .then((html: string | null) => {
          if (html) {
            passwordResetLink = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/.exec(
              html
            )![2];
            expect(passwordResetLink).to.be.a('string');

            cy.visit(passwordResetLink);
            cy.get('mat-label').contains('Password').type(passwordReset);
            cy.get('mat-label')
              .contains('Confirm Password')
              .type(passwordReset);
            cy.get('span').contains('Reset!').click();

            cy.loginFlow(emailAddress, passwordReset);
            dashboardSignPost();
          } else {
            throw new TypeError('HTML source is nullish');
          }
        });
    });
  });
});
