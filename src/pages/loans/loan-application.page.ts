import { Page } from '@playwright/test';

/** Dummy placeholder page object - see features/loans/loan-application.feature for why. */
export class LoanApplicationPage {
  constructor(private readonly page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
    // DemoQA runs ads that can overlap the form; closing any ad iframe keeps clicks reliable.
    await this.page.addStyleTag({ content: '#fixedban, .ad-container, footer { display: none !important; }' }).catch(() => {});
  }

  async fillPersonalDetails(firstName: string, lastName: string, email: string, mobile: string): Promise<void> {
    await this.page.locator('#firstName').fill(firstName);
    await this.page.locator('#lastName').fill(lastName);
    await this.page.locator('#userEmail').fill(email);
    // Gender is a required field for submission; the radio input itself is
    // visually hidden, so the click has to target its label.
    await this.page.getByText('Male', { exact: true }).click();
    await this.page.locator('#userNumber').fill(mobile);
  }

  async submit(): Promise<void> {
    const submit = this.page.locator('#submit');
    await submit.scrollIntoViewIfNeeded();
    await submit.click();
  }

  confirmationModal() {
    return this.page.locator('.modal-content');
  }
}
