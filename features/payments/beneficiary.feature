# The XYZ Bank demo has no "add payee/beneficiary" screen, so this feature uses
# the manager's "Add Customer" flow as the closest equivalent - registering a
# new party and then confirming it is visible in the customer list.
Feature: Beneficiary (customer) registration
  As a bank manager
  I want to register a new customer
  So that they exist as a payee/beneficiary the bank recognizes

  Background:
    Given I am on the XYZ Bank login page
    And I log in as the bank manager

  @payments @smoke
  Scenario: Manager adds a new beneficiary successfully
    When I add a new customer as a beneficiary
    Then I should see a confirmation containing "Customer added successfully"
    And that beneficiary should appear in the customer list

  @payments @negative
  Scenario: Manager cannot add the same beneficiary twice
    Given that beneficiary has already been added once
    When I try to add the same beneficiary again
    Then I should see a confirmation containing "Please check the details. Customer may be duplicate."
