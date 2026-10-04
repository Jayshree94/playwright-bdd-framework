import { Page } from '@playwright/test';

export class AccountSummaryPage {
  constructor(private readonly page: Page) {}

  async noAccountMessageVisible(): Promise<boolean> {
    return this.page.getByText('Please open an account with us.').isVisible();
  }

  /** Account number, balance and currency render as one text block ("Account Number : X , Balance : Y , Currency : Z") in the same div. */
  private async getSummaryText(): Promise<string> {
    return (await this.page.locator('div.center', { hasText: 'Balance :' }).first().textContent()) ?? '';
  }

  async getAccountNumber(): Promise<string> {
    const match = (await this.getSummaryText()).match(/Account Number\s*:\s*(\d+)/);
    if (!match) throw new Error('Account number not found in account summary');
    return match[1];
  }

  async getBalance(): Promise<string> {
    const match = (await this.getSummaryText()).match(/Balance\s*:\s*([\d.]+)/);
    if (!match) throw new Error('Balance not found in account summary');
    return match[1];
  }

  async getCurrency(): Promise<string> {
    const match = (await this.getSummaryText()).match(/Currency\s*:\s*(\w+)/);
    if (!match) throw new Error('Currency not found in account summary');
    return match[1];
  }

  async openTransactionsTab(): Promise<void> {
    await this.page.locator('button.tab', { hasText: 'Transactions' }).click();
  }

  transactionRows() {
    return this.page.locator('table tbody tr');
  }
}
