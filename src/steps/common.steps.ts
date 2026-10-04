import { expect } from '@playwright/test';
import { Given, When, Then, ScenarioContext } from '../fixtures';
import { LoginPage } from '../pages/login.page';
import { buildCustomer, fullName } from '../data/builders/customer.builder';

async function loginAsStoredCustomer(loginPage: LoginPage, ctx: ScenarioContext): Promise<void> {
  if (!ctx.customerFullName) {
    throw new Error('No customer has been registered yet in this scenario');
  }
  await loginPage.goHome();
  await loginPage.loginAsCustomer(ctx.customerFullName);
}

Given('I am on the XYZ Bank login page', async ({ loginPage }) => {
  await loginPage.goto();
});

When('I log in as the bank manager', async ({ loginPage }) => {
  await loginPage.loginAsManager();
});

Then('I should land on the manager dashboard', async ({ page }) => {
  await expect(page).toHaveURL(/#\/manager/);
});

Then('I should see the {string}, {string} and {string} tabs', async ({ page }, tab1, tab2, tab3) => {
  for (const label of [tab1, tab2, tab3]) {
    await expect(page.locator('button.tab', { hasText: label })).toBeVisible();
  }
});

Given('a new customer has been registered by the manager', async ({ loginPage, beneficiaryPage, ctx }) => {
  await loginPage.loginAsManager();
  const customer = buildCustomer();
  await beneficiaryPage.addCustomer(customer);
  ctx.customer = customer;
  ctx.customerFullName = fullName(customer);
});

When('I log in as that customer', async ({ loginPage, ctx }) => {
  await loginAsStoredCustomer(loginPage, ctx);
});

Given('I am logged in as that customer', async ({ loginPage, ctx }) => {
  await loginAsStoredCustomer(loginPage, ctx);
});

Then('I should land on the account summary page', async ({ page }) => {
  await expect(page).toHaveURL(/#\/account/);
});

Then('I should be prompted to open an account since none exists yet', async ({ page }) => {
  await expect(page.getByText('Please open an account with us.')).toBeVisible();
});

When('I open the customer login screen', async ({ loginPage }) => {
  await loginPage.openCustomerLoginScreen();
});

Then('the customer {string} button should not be visible', async ({ page }, label: string) => {
  await expect(page.getByRole('button', { name: label, exact: true })).not.toBeVisible();
});
