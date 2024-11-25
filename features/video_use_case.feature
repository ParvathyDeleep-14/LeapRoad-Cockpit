Feature:Video use case 
    @createvideo
Scenario: User navigates to video page and create a training video
    Given I am logged in to leaproad account
    When I navigate to video page
    Then I click on "Create New Video" button
    Then I fill the title 
    Then I choose training from dropdown
    Then I click "Create Video" button
    Then I enter the script
    Then I select the script to provide subtitle
    
    @createvideo
Scenario: User adds subtitle
    Given I am logged in as LeapRoadAdmin
    When I navigate to video page
    Then I click on the sample personalized video
    Then I enter the script
    Then I select the script 
    Then I click on "Add Subtitle"
    Then I select audio profile
    Then I click confirm script button
     
    @createvideo
Scenario: User adds video prompt
    Given I am logged in as LeapRoadAdmin
    When I navigate to video page
    Then I click on the sample personalized video
    Then I enter the script
    Then I select the script
    Then I click "Add Video"
    Then I give the video prompt
    Then I click on the "Get Stock Videos" button
    Then I select one of the prompts
    Then I "Save Video"
    Then I select audio profile
    Then I click confirm script button
     
    @createvideo
Scenario: User adds slide
    Given I am logged in as LeapRoadAdmin
    When I navigate to video page
    Then I click on the sample personalized video
    Then I enter the script
    Then I select the script
    Then I click Add Slide
    Then I upload slide
    Then I select the script

    Scenario:User navigates to video page and create a DIY video
    Given I am logged in as LeapRoadAdmin
    When I navigate to video page
    Then I click on "Create New Video" button
    Then I fill the title 
    Then I choose DIY from dropdown
    Then I click create video button

    Scenario:Provide sample answers
    Given I am logged in as LeapRoadAdmin
    When I navigate to video page
    Then I click on the sample DIY video
    Then I provide sample answers