// code courtesy of:
// https://dev.to/jprealini/how-to-test-sent-and-received-emails-with-cypress-10-ethereal-and-nodemailer-5h25
import * as nodemailer from 'nodemailer';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

export const makeEmailAccount = async () => {
  // generate a new ethereal email inbox account
  const testAccount = await nodemailer.createTestAccount();

  console.log('created new email account', testAccount.user);
  console.log('for debugging, the password is', testAccount.pass);

  return {
    user: {
      email: testAccount.user,
      pass: testAccount.pass,
    },

    /**
     * Utility method for getting the last email
     * for the Ethereal email account using ImapFlow.
     */
    async getLastEmail() {
      let client = new ImapFlow({
        host: 'ethereal.mail',
        port: 993,
        secure: true,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      await client.connect();

      let message;
      let lock = await client.getMailboxLock('INBOX');
      try {
        message = await client.fetchOne('*', {
          source: true,
        });
        console.log(`The message is ${message}`);

        for await (let message of client.fetch('1:*', { envelope: true })) {
          console.log(`${message.uid}: ${message.envelope.subject}`);
        }
      } finally {
        lock.release();
      }

      // log out and close connection
      await client.logout();

      const mail = await simpleParser(message.source);
      console.log(mail.subject);
      console.log(mail.text);

      // return the main fields + attachments array
      return {
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        attachments: mail.attachments,
      };
    },
    /**
     * Utility method for sending an email
     * to the Ethereal email account created above.
     */
    async sendEmail() {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
        attachments: [
          {
            filename: 'hello.json',
            content: JSON.stringify({
              name: 'Hello World!',
            }),
          },
        ],
      });
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return info.messageId;
    },
  };
};
