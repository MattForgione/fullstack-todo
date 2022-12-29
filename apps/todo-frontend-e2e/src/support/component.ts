import './commands';
import { mount } from 'cypress/angular';
import { Email, InboxDto } from 'mailslurp-client';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      createInbox(): Promise<InboxDto>;
      waitForLatestEmail(inboxId: string | undefined): Promise<Email>;
    }
  }
}
