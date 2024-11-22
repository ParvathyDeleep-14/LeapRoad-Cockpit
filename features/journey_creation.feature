

Feature: Journey Creation and Image Upload

# Background:
#     Given I am logged in as LeapRoadAdmin
 @CPTJRNY
  Scenario: Verify creating a journey successfully
    # Given I navigate to the login page
    # When I enter the username "leaproadexpert@gmail.com" and password "LeapRoadAdmin@123"
    # Then I should see a success message or the homepage
    # Given I am on the journey creation page
    Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then the journey should be created successfully
    And I should see a success message "Successfully created journey"
    Then if a journey with the same name exists
    Then I should see an error message "Journey with the same name already exists"

 @CPTJRNY
 Scenario: Verify creating a journey with duplicate name
Given I am logged in as LeapRoadAdmin
    When I click on "Create New Journey"
    When I fill in a "uniqueJourneyName"
    And I select the "Relationships" option from the dropdown
    And I click on the "Submit" button
    Then if a journey with the same name exists
    Then I should see an error message "Journey with the same name already exists"

#   Scenario: Add an image to the journey
#     Given I have created a journey
#     When I click the "Add Image" button
#     Then I should see the file upload option

#   Scenario: Verify image upload functionality
#     Given I am on the image upload page
#     When I upload an image file named "IP.jpg"
#     And I fill in the image title as "Profile image"
#     Then I should see the uploaded file in the UI
#     And the file name "IP.jpg" should be visible
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
    
  #  @createJourney
    # Scenario: User upload PPT file
    # Given I am logged in as LeapRoadAdmin
    # When I click on "Create New Journey"
    # When I fill in a "uniqueJourneyName"
    # And I select the "Relationships" option from the dropdown
    # And I click on the "Submit" button
    # Then the journey should be created successfully
    # And I should see a success message "Successfully created journey"
    # Then I add a milestone with the name "sample milestone"
    # Then I click the "Upload File" button
    # Then I click the dropdown
    # Then I upload PPT file
    
    # Scenario: User navigates to video page
    # Given I am logged in as LeapRoadAdmin
    # When I navigate to video page
    # Then I click on "Create New Video" button
    # Then I fill the title 
    # Then I choose video type from dropdown
    # Then I click "Create Video" button
    # Then I enter the script
    # Then I select the script to provide subtitle
    
    # @createvideo
    # Scenario: Add subtitles, prompts and slides
    # Given I am logged in as LeapRoadAdmin
    # When I navigate to video page
    # Then I click on the sample personalized video
    # Then I enter the script
    # Then I select the script to provide subtitle
    # Then I click on "Add Subtitle"
    # Then I click on "Add Video"
