import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures';
import { getEnvironment } from '../../config/environments';

Given('I am on the loan application practice form', async ({ loanApplicationPage }) => {
  await loanApplicationPage.goto(getEnvironment().loanFormURL);
});

When('I fill in my personal and contact details', async ({ loanApplicationPage }) => {
  await loanApplicationPage.fillPersonalDetails('Jon', 'Snow', `jon.snow.${Date.now()}@example.com`, '9876543210');
});

When('I submit the loan application', async ({ loanApplicationPage }) => {
  await loanApplicationPage.submit();
});

Then('I should see a submitted application confirmation', async ({ loanApplicationPage }) => {
  await expect(loanApplicationPage.confirmationModal()).toBeVisible();
});
