Feature: Account summary
  As a logged-in customer
  I want to see my account number, balance and currency
  So that I can confirm the state of my account

  Background:
    Given I am on the XYZ Bank login page
    And a new customer has been registered by the manager
    And an account in "Dollar" has been opened for that customer
    And I am logged in as that customer

  @accounts @smoke
  Scenario: Customer views account summary right after opening an account
    Then I should see my account number
    And my account balance should be "0"
    And my account currency should be "Dollar"

  @accounts
  Scenario: Customer views an empty transaction history for a brand-new account
    When I open the transactions tab
    Then the transaction list should be empty
