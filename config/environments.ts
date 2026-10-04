export type EnvName = 'qa' | 'staging' | 'prod';

export interface EnvironmentConfig {
  /** Origin + path of the XYZ Bank SPA, without the #/route fragment. */
  baseURL: string;
  /** Standalone public form used only by the dummy loans placeholder feature. */
  loanFormURL: string;
}

/**
 * This suite targets the public XYZ Bank demo (globalsqa) and the DemoQA practice
 * form, both single-instance public sites with no separate qa/staging/prod tiers.
 * The three names are kept to match the requested env-switch shape; all three
 * resolve to the same public URLs unless overridden via BASE_URL/LOAN_FORM_URL.
 */
const environments: Record<EnvName, EnvironmentConfig> = {
  qa: {
    baseURL: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/',
    loanFormURL: 'https://demoqa.com/automation-practice-form',
  },
  staging: {
    baseURL: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/',
    loanFormURL: 'https://demoqa.com/automation-practice-form',
  },
  prod: {
    baseURL: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/',
    loanFormURL: 'https://demoqa.com/automation-practice-form',
  },
};

export function getEnvironment(): EnvironmentConfig {
  const envName = (process.env.TEST_ENV as EnvName) || 'qa';
  const config = environments[envName];
  if (!config) {
    throw new Error(`Unknown TEST_ENV "${envName}". Valid values: ${Object.keys(environments).join(', ')}`);
  }
  return {
    baseURL: process.env.BASE_URL || config.baseURL,
    loanFormURL: process.env.LOAN_FORM_URL || config.loanFormURL,
  };
}
