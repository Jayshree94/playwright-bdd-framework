import { Page } from '@playwright/test';
import { CustomerInput } from '../../types';
import { ManagerNavComponent } from '../components/manager-nav.component';
import { DialogHandlerComponent } from '../components/dialog-handler.component';

/**
 * Stands in for an "add beneficiary/payee" screen: the demo bank has none, so
 * registering a new customer via the manager's "Add Customer" tab is the
 * closest equivalent available on this app.
 */
export class BeneficiaryPage {
  private readonly nav: ManagerNavComponent;

  constructor(
    private readonly page: Page,
    private readonly dialogs: DialogHandlerComponent,
  ) {
    this.nav = new ManagerNavComponent(page);
  }

  async addCustomer(customer: CustomerInput): Promise<string> {
    await this.nav.goToAddCustomerTab();
    await this.page.getByPlaceholder('First Name').fill(customer.firstName);
    await this.page.getByPlaceholder('Last Name').fill(customer.lastName);
    await this.page.getByPlaceholder('Post Code').fill(customer.postCode);
    return this.dialogs.captureNext(async () => {
      await this.page.locator('button[type="submit"]').click();
    });
  }
}
