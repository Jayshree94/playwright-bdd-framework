import { Page } from '@playwright/test';

/** Deposit and withdrawal tabs, both nested inside the customer's account view. */
export class FundTransferPage {
  constructor(private readonly page: Page) {}

  // Deposit and withdrawal are both nested states with an empty url (''), so
  // the hash never changes on switch; waiting for each form's own submit
  // button text is what proves the right one actually mounted.
  async openDepositTab(): Promise<void> {
    await this.page.locator('button.tab', { hasText: 'Deposit' }).click();
    await this.page.locator('button[type="submit"]', { hasText: 'Deposit' }).waitFor({ state: 'visible' });
  }

  async openWithdrawTab(): Promise<void> {
    await this.page.locator('button.tab', { hasText: 'Withdrawl' }).click();
    await this.page.locator('button[type="submit"]', { hasText: 'Withdraw' }).waitFor({ state: 'visible' });
  }

  async deposit(amount: string): Promise<void> {
    await this.openDepositTab();
    await this.page.locator('input[type="number"]').fill(amount);
    await this.page.locator('button[type="submit"]').click();
  }

  async withdraw(amount: string): Promise<void> {
    await this.openWithdrawTab();
    await this.page.locator('input[type="number"]').fill(amount);
    await this.page.locator('button[type="submit"]').click();
  }

  async getMessage(): Promise<string> {
    const message = this.page.locator('span.error');
    await message.waitFor({ state: 'visible' });
    return (await message.textContent())?.trim() ?? '';
  }
}
