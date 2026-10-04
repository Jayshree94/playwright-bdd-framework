import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures';
import { buildCustomer, fullName } from '../data/builders/customer.builder';

// --- Fund transfer (deposit / withdrawal) ---

When('I deposit {string} into my account', async ({ fundTransferPage }, amount: string) => {
  await fundTransferPage.deposit(amount);
});

Given('I have deposited {string} into my account', async ({ fundTransferPage }, amount: string) => {
  await fundTransferPage.deposit(amount);
});

When('I withdraw {string} from my account', async ({ fundTransferPage }, amount: string) => {
  await fundTransferPage.withdraw(amount);
});

Then('I should see the transaction message {string}', async ({ fundTransferPage }, expected: string) => {
  expect(await fundTransferPage.getMessage()).toBe(expected);
});

// --- Beneficiary (manager "add customer" stand-in) ---

When('I add a new customer as a beneficiary', async ({ beneficiaryPage, ctx }) => {
  const customer = buildCustomer();
  ctx.customer = customer;
  ctx.customerFullName = fullName(customer);
  ctx.lastMessage = await beneficiaryPage.addCustomer(customer);
});

Given('that beneficiary has already been added once', async ({ beneficiaryPage, ctx }) => {
  const customer = buildCustomer();
  ctx.customer = customer;
  ctx.customerFullName = fullName(customer);
  ctx.lastMessage = await beneficiaryPage.addCustomer(customer);
});

When('I try to add the same beneficiary again', async ({ beneficiaryPage, ctx }) => {
  if (!ctx.customer) {
    throw new Error('No beneficiary has been added yet in this scenario');
  }
  ctx.lastMessage = await beneficiaryPage.addCustomer(ctx.customer);
});

Then('I should see a confirmation containing {string}', async ({ ctx }, expected: string) => {
  expect(ctx.lastMessage).toContain(expected);
});

Then('that beneficiary should appear in the customer list', async ({ customerListPage, ctx }) => {
  if (!ctx.customer) {
    throw new Error('No beneficiary has been added yet in this scenario');
  }
  expect(await customerListPage.isListed(ctx.customer)).toBe(true);
});
