Feature: Login functionality
  @CSCN
  Scenario: Verify login with correct credentials to Cockpit
    Given I navigate to the login page
    When I enter the username "leaproadexpert@gmail.com" and password "LeapRoadAdmin@123"
    Then I should see a success message or the homepage
   
  @CSCN
  Scenario: Verify failed login due to wrong credentials
    Given I navigate to the login page
    When I enter the username "leaproadexpert@gmail.com" and password "wrongpassword"
    Then I should see a login error message "Incorrect username or password. Please verify & try again."





    
