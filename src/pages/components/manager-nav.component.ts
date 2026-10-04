import { Page } from '@playwright/test';

/** The three manager tabs (Add Customer / Open Account / Customers) share one nav bar across pages. */
export class ManagerNavComponent {
  constructor(private readonly page: Page) {}

  // Scoped to button.tab: the Add Customer form also has a submit button with
  // the same visible text, so matching on the shared "tab" class (rather than
  // accessible name alone) is what keeps this unambiguous.
  async goToAddCustomerTab(): Promise<void> {
    await this.page.locator('button.tab', { hasText: 'Add Customer' }).click();
  }

  async goToOpenAccountTab(): Promise<void> {
    await this.page.locator('button.tab', { hasText: 'Open Account' }).click();
  }

  async goToCustomersTab(): Promise<void> {
    await this.page.locator('button.tab', { hasText: 'Customers' }).click();
  }

  tabs() {
    return this.page.locator('button.tab');
  }
}
