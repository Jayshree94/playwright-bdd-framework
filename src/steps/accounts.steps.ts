import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures';
import { Currency } from '../types';

Given('an account in {string} has been opened for that customer', async ({ openAccountPage, ctx }, currency: string) => {
  if (!ctx.customerFullName) {
    throw new Error('No customer has been registered yet in this scenario');
  }
  ctx.accountNo = await openAccountPage.openAccountFor(ctx.customerFullName, currency as Currency);
});

Then('I should see my account number', async ({ accountSummaryPage, ctx }) => {
  expect(await accountSummaryPage.getAccountNumber()).toBe(ctx.accountNo);
});

Then('my account balance should be {string}', async ({ accountSummaryPage }, expected: string) => {
  await expect.poll(() => accountSummaryPage.getBalance()).toBe(expected);
});

Then('my account currency should be {string}', async ({ accountSummaryPage }, expected: string) => {
  expect(await accountSummaryPage.getCurrency()).toBe(expected);
});

When('I open the transactions tab', async ({ accountSummaryPage }) => {
  await accountSummaryPage.openTransactionsTab();
});

Then('the transaction list should be empty', async ({ accountSummaryPage }) => {
  await expect(accountSummaryPage.transactionRows()).toHaveCount(0);
});
