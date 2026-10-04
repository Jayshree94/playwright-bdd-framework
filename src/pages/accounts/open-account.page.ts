import { Page } from '@playwright/test';
import { Currency } from '../../types';
import { ManagerNavComponent } from '../components/manager-nav.component';
import { DialogHandlerComponent } from '../components/dialog-handler.component';

export class OpenAccountPage {
  private readonly nav: ManagerNavComponent;

  constructor(
    private readonly page: Page,
    private readonly dialogs: DialogHandlerComponent,
  ) {
    this.nav = new ManagerNavComponent(page);
  }

  /** Opens an account for `fullName` and returns the new account number parsed from the confirmation alert. */
  async openAccountFor(fullName: string, currency: Currency): Promise<string> {
    await this.nav.goToOpenAccountTab();
    await this.page.locator('#userSelect').selectOption({ label: fullName });
    await this.page.locator('#currency').selectOption(currency);
    const message = await this.dialogs.captureNext(async () => {
      await this.page.locator('button[type="submit"]').click();
    });
    const accountNo = message.match(/Account Number\s*:\s*(\d+)/i)?.[1];
    if (!accountNo) {
      throw new Error(`Could not parse account number from confirmation message: "${message}"`);
    }
    return accountNo;
  }
}
