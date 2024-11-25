

Feature: Journey Creation and Image Uplaod

 @CPTJRNY
  Scenario: Verify creating a journey successfully
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"

 @CPTJRNY
 Scenario: Verify creating a journey with duplicate name
Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then if a journey with the same name exists
    Then I should see an error message "Journey with the same name already exists"

@CPTJRNY
Scenario: Verify sending message in chat
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    When I am on the chat screen
    When I send a chat message
    Then I should see the chat content visible
@CPTJRNY
    Scenario: Verify chat visibility
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    When I am on the chat screen
    When I send a chat message
    Then I should see the chat content visible
@CPTJRNY
    Scenario: Verify adding question, section and milestone
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    Then I add a question with the name "Sample Question"
    Then I click the add button for the section
    Then I delete an added question
    Then I fill in the section name as "sample section"
    Then I add a milestone with the name "sample milestone"
@CPTJRNY
    Scenario: Verify adding video url in milestone
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    Then I add a milestone with the name "sample milestone"
    Then I add a video url
@CPTJRNY
    Scenario: Verify upload video 
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    Then I add a milestone with the name "sample milestone"
    Then I click the "Upload or Add Video" button
    Then I upload video
@CPTJRNY
  Scenario: Verify adding a journey video
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    Then I add a milestone with the name "sample milestone"
    Then I click the "Upload or Add Video" button
    Then I click the "Add Video" button
    Then I click the drop down and select a journey video option from the dropdown
@CPTJRNY
    Scenario: Verify adding a training video
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    Then I add a milestone with the name "sample milestone"
    Then I click the "Upload or Add Video" button
    Then I click the "Add Video" button
    Then I click the drop down and select a training video option from the dropdown
@CPTJRNY
    Scenario: Verify uploading an image file
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    Then I add a milestone with the name "sample milestone"
    Then I click the "Upload File" button
    Then I upload image file
    
  
