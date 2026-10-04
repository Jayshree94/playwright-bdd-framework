import { CustomerInput } from '../../types';

/**
 * The app under test rejects a new customer only when fName + lName + postCd
 * all match an existing one, so a unique suffix per build keeps independent
 * scenarios from colliding while still allowing an intentional duplicate
 * (reuse the same CustomerInput) for the negative beneficiary scenario.
 */
export function buildCustomer(overrides: Partial<CustomerInput> = {}): CustomerInput {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    firstName: 'Jon',
    lastName: `Snow${suffix}`,
    postCode: `PC${suffix}`,
    ...overrides,
  };
}

export function fullName(customer: CustomerInput): string {
  return `${customer.firstName} ${customer.lastName}`;
}
