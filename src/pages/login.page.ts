import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('#/login');
    // AngularJS attaches its ng-click handlers only after bootstrap finishes;
    // without this wait the very first click after a hard navigation can land
    // before the listener exists and silently do nothing.
    await this.page.waitForFunction(() => {
      const ng = (window as unknown as { angular?: { element: (s: unknown) => { injector: () => unknown } } }).angular;
      return !!ng?.element(document.body).injector();
    });
  }

  /** Returns to the role-selection screen via the app's own "Home" button instead of reloading. */
  async goHome(): Promise<void> {
    await this.page.getByRole('button', { name: 'Home' }).click();
    await this.page.waitForURL(/#\/login/);
  }

  async loginAsManager(): Promise<void> {
    await this.page.getByRole('button', { name: 'Bank Manager Login' }).click();
    await this.page.waitForURL(/#\/manager/);
  }

  async openCustomerLoginScreen(): Promise<void> {
    await this.page.getByRole('button', { name: 'Customer Login' }).click();
    await this.page.waitForURL(/#\/customer/);
  }

  async loginAsCustomer(fullName: string): Promise<void> {
    await this.openCustomerLoginScreen();
    await this.page.locator('#userSelect').selectOption({ label: fullName });
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForURL(/#\/account/);
  }
}
