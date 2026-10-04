Feature: Login
  As a bank user
  I want to log in as either the bank manager or a registered customer
  So that I can reach the area of the application relevant to my role

  Background:
    Given I am on the XYZ Bank login page

  @auth @smoke
  Scenario: Bank manager logs in successfully
    When I log in as the bank manager
    Then I should land on the manager dashboard
    And I should see the "Add Customer", "Open Account" and "Customers" tabs

  @auth @smoke
  Scenario: A newly registered customer can log in
    Given a new customer has been registered by the manager
    When I log in as that customer
    Then I should land on the account summary page
    And I should be prompted to open an account since none exists yet

  @auth @negative
  Scenario: The customer login button stays hidden until a name is chosen
    When I open the customer login screen
    Then the customer "Login" button should not be visible
