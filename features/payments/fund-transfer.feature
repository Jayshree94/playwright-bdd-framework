# The XYZ Bank demo has no peer-to-peer transfer endpoint, so this feature
# exercises its closest equivalents - deposit and withdrawal - as the
# "funds movement" scenarios for this framework.
Feature: Fund transfer (deposit / withdrawal)
  As a logged-in customer
  I want to deposit and withdraw funds
  So that my account balance reflects my transactions

  Background:
    Given I am on the XYZ Bank login page
    And a new customer has been registered by the manager
    And an account in "Dollar" has been opened for that customer
    And I am logged in as that customer

  @payments @smoke
  Scenario: Depositing funds increases the account balance
    When I deposit "500" into my account
    Then I should see the transaction message "Deposit Successful"
    And my account balance should be "500"

  @payments
  Scenario: Withdrawing funds within the balance succeeds
    Given I have deposited "500" into my account
    When I withdraw "200" from my account
    Then I should see the transaction message "Transaction successful"
    And my account balance should be "300"

  @payments @negative
  Scenario: Withdrawing more than the balance is rejected
    When I withdraw "100" from my account
    Then I should see the transaction message "Transaction Failed. You can not withdraw amount more than the balance."
    And my account balance should be "0"
