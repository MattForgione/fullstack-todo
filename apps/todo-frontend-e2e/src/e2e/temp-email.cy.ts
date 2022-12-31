import { recurse } from 'cypress-recurse';

let password = 'Testing12#';
let emailAddress: string;
let verifyEmailLink: string;

function dashboardSignPost() {
  return cy.get('h1.module-title--title').contains('Dashboard');
}

describe('Sign up flow based tests using ethereal and nodemailer', () => {
  before(() => {
    cy.task('getUserEmail').then((user: any) => {
      cy.log(user.email);
      cy.log(user.pass);
      emailAddress = user.email;

      expect(emailAddress).to.be.a('string');
    });
  });

  context('Account creation testing', () => {
    it('can load the sign up form and find valid verification email', () => {
      cy.visit('/auth/signup');
      cy.contains('Sign Up');

      // signup with inbox email address and the password;
      cy.get('mat-label').contains('Email').type(emailAddress);
      cy.get('mat-label').contains('Password').type(password);
      cy.get('mat-label').contains('Password Confirm').type(password);
      cy.get('span').contains('Sign Up!').click();

      // cy.wait(5000);
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
      cy.wait(1000);

      dashboardSignPost();
    });

    it('upon revisiting the verification link, it should take you to the link expired page', () => {
      cy.visit(verifyEmailLink);
      cy.get('p').should('contain', 'That link has expired...');
    });
  });
});
