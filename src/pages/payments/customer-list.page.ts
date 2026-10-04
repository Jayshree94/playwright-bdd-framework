import { Page } from '@playwright/test';
import { CustomerInput } from '../../types';
import { ManagerNavComponent } from '../components/manager-nav.component';

export class CustomerListPage {
  private readonly nav: ManagerNavComponent;

  constructor(private readonly page: Page) {
    this.nav = new ManagerNavComponent(page);
  }

  async open(): Promise<void> {
    await this.nav.goToCustomersTab();
  }

  async search(text: string): Promise<void> {
    await this.page.getByPlaceholder('Search Customer').fill(text);
  }

  row(customer: CustomerInput) {
    return this.page
      .locator('table tbody tr', { hasText: customer.firstName })
      .filter({ hasText: customer.lastName });
  }

  async isListed(customer: CustomerInput): Promise<boolean> {
    await this.open();
    // Angular's `filter:searchCustomer` matches each field independently, so
    // searching "First Last" (spanning two separate fName/lName fields) never
    // matches; the generated lastName suffix is unique enough on its own.
    await this.search(customer.lastName);
    return (await this.row(customer).count()) > 0;
  }
}
