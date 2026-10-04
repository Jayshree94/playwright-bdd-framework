import { test as base, createBdd } from 'playwright-bdd';
import { CustomerInput } from '../types';
import { LoginPage } from '../pages/login.page';
import { OpenAccountPage } from '../pages/accounts/open-account.page';
import { AccountSummaryPage } from '../pages/accounts/account-summary.page';
import { FundTransferPage } from '../pages/payments/fund-transfer.page';
import { BeneficiaryPage } from '../pages/payments/beneficiary.page';
import { CustomerListPage } from '../pages/payments/customer-list.page';
import { LoanApplicationPage } from '../pages/loans/loan-application.page';
import { DialogHandlerComponent } from '../pages/components/dialog-handler.component';

/** Mutable scenario-scoped state steps hand off between each other (e.g. the customer just created). */
export interface ScenarioContext {
  customer?: CustomerInput;
  customerFullName?: string;
  accountNo?: string;
  lastMessage?: string;
}

type Fixtures = {
  dialogHandler: DialogHandlerComponent;
  loginPage: LoginPage;
  openAccountPage: OpenAccountPage;
  accountSummaryPage: AccountSummaryPage;
  fundTransferPage: FundTransferPage;
  beneficiaryPage: BeneficiaryPage;
  customerListPage: CustomerListPage;
  loanApplicationPage: LoanApplicationPage;
  ctx: ScenarioContext;
};

export const test = base.extend<Fixtures>({
  // One dialog listener per page: the app confirms "add customer"/"open account" via
  // window.alert(), and Playwright throws if a second listener tries to re-accept
  // a dialog another listener already handled.
  dialogHandler: async ({ page }, use) => use(new DialogHandlerComponent(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  openAccountPage: async ({ page, dialogHandler }, use) => use(new OpenAccountPage(page, dialogHandler)),
  accountSummaryPage: async ({ page }, use) => use(new AccountSummaryPage(page)),
  fundTransferPage: async ({ page }, use) => use(new FundTransferPage(page)),
  beneficiaryPage: async ({ page, dialogHandler }, use) => use(new BeneficiaryPage(page, dialogHandler)),
  customerListPage: async ({ page }, use) => use(new CustomerListPage(page)),
  loanApplicationPage: async ({ page }, use) => use(new LoanApplicationPage(page)),
  // eslint-disable-next-line no-empty-pattern
  ctx: async ({}, use) => use({}),
});

export const { Given, When, Then } = createBdd(test);
