Feature: Auth
  Scenario: Redirect to Login
    Given I am not a logged in user
    When I visit the home page
    Then I should be redirected to the login page

  Scenario: Register User
    Given I am not a logged in user
    When I visit the signup page
    And I enter my details
    Then I should sign up and be redirected to the home page