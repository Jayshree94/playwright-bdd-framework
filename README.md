# playwright-bdd-framework

BDD E2E automation framework using Playwright, Cucumber (Gherkin), and TypeScript, with Allure/HTML/JUnit reporting.

Targets the [XYZ Bank demo](https://www.globalsqa.com/angularJs-protractor/BankingProject/) for auth, accounts and payments scenarios, and a public practice form as a placeholder for the loans domain (see `features/loans/loan-application.feature` for why).

## Setup

```bash
npm install
npx playwright install chromium firefox
cp .env.example .env
```

## Run

```bash
npm test                      # generates BDD specs and runs the full suite
npm run test:chromium         # chromium only
npm run report:allure         # generate + open the Allure report
```

## Structure

- `features/` — Gherkin feature files, grouped by domain
- `src/steps/` — step definitions
- `src/pages/` — page objects
- `src/fixtures/` — `test.extend()` fixtures and `createBdd(test)`
- `config/environments.ts` — per-environment base URLs
- `ci/Jenkinsfile`, `.github/workflows/playwright.yml` — CI pipelines
