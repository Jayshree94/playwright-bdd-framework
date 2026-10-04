# Placeholder / dummy feature: the XYZ Bank demo has no loan module. This
# scenario runs against a separate public form (DemoQA practice form) purely to
# prove out the framework's folder structure end-to-end for a "loans" domain.
# It is NOT a real banking assertion and should be replaced once a real loan
# application target exists.
Feature: Loan application (dummy placeholder)
  As an applicant
  I want to submit my personal details on a loan application form
  So that the framework has a working example under the loans/ domain

  @loans @dummy
  Scenario: Applicant submits a loan application form
    Given I am on the loan application practice form
    When I fill in my personal and contact details
    And I submit the loan application
    Then I should see a submitted application confirmation
