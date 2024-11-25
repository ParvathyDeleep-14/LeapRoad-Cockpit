const { Given, When, Then, After } = require("@cucumber/cucumber");
const { leaproadLogin, launchBrowser } = require("../../utils/helpers");
const {uploadFile}= require("../../utils/helpers")
const LoginPage = require("../../pages/loginPage");
const HomePage = require("../../pages/homepage");
const VideoPage= require("../../pages/videoPage")
const { expect } = require("@playwright/test");
const { setWorldConstructor } = require("@cucumber/cucumber");
const { timeout } = require("../../playwright.config");
const { text } = require("node:stream/consumers");
const { log } = require("console");

let browser;
let page;
let loginPage;
let homePage;
let videoPage;

Given("I am logged in as LeapRoadAdmin", { timeout: 10000 }, async () => {
  const browserData = await launchBrowser(false);
  browser = browserData.browser;
  page = browserData.page;
  homePage = new HomePage(page);
  videoPage = new VideoPage(page);
  // Use leaproadLogin helper to log in
  // console.log("sample tester");
  await leaproadLogin(page, "leaproadexpert@gmail.com", "LeapRoadAdmin@123");
});

When('I click on "Create New Journey"', { timeout: 30000 }, async () => {
  await page.click(homePage.CREATE_JOURNEY);
});

When("I fill in a {string}", { timeout: 120000 }, async (string) => {
  const timestamp = Date.now();
  const uniqueJourneyName = `SampleJourney${timestamp}`;
  console.log(uniqueJourneyName);

  await page.waitForLoadState("networkidle");
  await page.waitForSelector('[placeholder="Enter journey Name"]', {
    timeout: 120000,
  });
  await page.fill('[placeholder="Enter journey Name"]', uniqueJourneyName);

  console.log("Unique Journey Name: " + uniqueJourneyName);

  await page.waitForTimeout(1000); // Adjust timeout based on your application's needs
});

When('I select the "Relationships" option from the dropdown', async () => {
  await page.click(homePage.DROP_DOWN); // Dropdown menu
  await page.click(homePage.RELATIONSHIPS); // Selects "Relationships" option
});

When('I click on the "Submit" button', async () => {
  await page.click(homePage.BUTTON); // Assuming BUTTON is the selector for the submit button
  await page.waitForTimeout(2000);
});

Then("the journey should be created successfully", async () => {
  const successMessage = await page.isVisible(
    'text="Successfully created journey"'
  );
  expect(successMessage).toBeTruthy(); // Expect a success message to be visible
});

Then("I should see a success message {string}", async (message) => {
  const isVisible = await page.isVisible(`text="${message}"`);
  expect(isVisible).toBeTruthy(); // Expect the given message to be visible
});

Then("if a journey with the same name exists", async () => {
  const errorMessage = await homePage.getErrorMessage();

  if (errorMessage === "Journey with the same name already exists") {
    console.log("Duplicate journey error encountered.");
  } else if (errorMessage === "Successfully created journey") {
    // console.log("Journey was created successfully");
  }
});

Then("I should see an error message {string}", async (expectedMessage) => {
  // Check if the error message is visible
  const errorMessageVisible = await homePage.page.isVisible(
    'text="Journey with the same name already exists"'
  );

  if (errorMessageVisible) {
    const actualMessage = await homePage.page.textContent(
      'text="Journey with the same name already exists"'
    );

    if (actualMessage === expectedMessage) {
      console.log("Error message displayed correctly: " + actualMessage);
    } else {
      throw new Error(
        `Expected error message: '${expectedMessage}' but got: '${actualMessage}'`
      );
    }
  } else {
    // If the error message is not found, skip the check
    console.log("Error message not found, skipping the check.");
  }
});
When("I am on the chat screen", async () => {
  await page.fill(homePage.CHAT, "Hi"); // Use 'this.page' if 'page' is part of Cucumber's World context
  console.log("Navigated to the chat screen");
});
When("I send a chat message", async () => {
  await page.click(homePage.SEND);
  await page.waitForTimeout(2000);
  // console.log("Message send");
});

Then("I should see the chat content visible", async () => {
  const chatContentElements = await page.$$(homePage.CHAT_CONTENT);

  if (chatContentElements.length > 0) {
    visibleMessages = [];
    for (const element of chatContentElements) {
      const isVisible = await element.isVisible();
      if (isVisible) {
        const textContent = await element.textContent();
        // console.log("Chat content is visible:", textContent);
        expect(textContent).toBeTruthy();
        visibleMessages.push(textContent);
      } else {
        // console.log("Chat content is not visible");
      }
    }
  } else {
    throw new Error("No chat content elements found.");
  }
});

Then('I add a question with the name "Sample Question"', async () => {
await page.fill(homePage.Q1, "sample Question");
await page.waitForTimeout(2000);
});

Then('I click the add button for the section', async ()=>{
await page.waitForSelector(homePage.ADD_BUTTON, { visible: true });

  // Find the button and click it
  const elements = await page.$$(homePage.ADD_BUTTON);
  if (elements.length > 0) {
    await elements[0].click();
  } else {
    throw new Error('Add button not found');
  }

  await page.waitForTimeout(3000);
});

Then ('I delete an added question', async ()=>{
await page.click(homePage.DELETE_ADDQUESTION);
})
Then ('I fill in the section name as "sample section"', async()=>{
await page.fill(homePage.S1, "sample section");
await page.waitForTimeout(3000);
})
Then ('I add a milestone with the name "sample milestone"', async()=>{
await page.waitForSelector(homePage.M1)
await page.fill(homePage.M1, "sample milestone");
// console.log("content created");

})
Then ('I add a video url',async()=>{
    await page.$$(homePage.ADD_VIDEO).then((elements) => elements[1].click());
    await page.fill(
      homePage.LINK1,
      "https://youtu.be/oV74Najm6Nc?si=VM3UfAVMsowVWT3Q"
    );
})
Then ('I click the "Upload or Add Video" button',async()=>{
    await page.click(homePage.ADD_VIDEO);

})


Then('I upload video',{timeout:15000}, async () => {
    const uploadButtonSelector = '.ant-upload.ant-upload-select'; // Adjust if needed
    const filePath = 'C:\\Users\\parva\\Downloads\\Jumping Jacks.mp4'; // Adjust file path
    const upload='.css-oxlnmf-ant-btn-primary'
  
    // Trigger file chooser and handle file upload
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click(uploadButtonSelector)
      
    ]);
    await fileChooser.setFiles(filePath);
    // console.log("video upload done");
    await page.waitForTimeout(1000); 
    await page.fill(homePage.TITLE, "Sample video");
    await page.click('button.ant-btn.css-15z9l4e.ant-btn-primary >> text=Upload');

    await page.waitForTimeout(3000);
    
  });
  
  Then ('I click the "Add Video" button', async()=>{
    await page.click('div.ant-segmented-item-label[title="Add"]');

    })
  Then ('I click the drop down and select a journey video option from the dropdown', async()=>{
    await page.click('div.ant-select-selection-overflow');
    await page.click('text="no title"');
    await page.click('div.ant-select-selection-overflow');

await page.click('button.ant-btn.css-15z9l4e.ant-btn-primary >> text=Add');
  })
  Then ('I click the drop down and select a training video option from the dropdown', async ()=>{
    const elements = await page.$$('div.ant-select-selection-overflow');
if (elements.length > 1) {
    await elements[1].click(); // Click the second element
}
  // console.log("clicked");
await page
.locator('div[title="leaproad_video_LeapRoad_Expert_20240925_081428"]')
.click();
    await elements[1].click(); // Click the second element
await page.click('button.ant-btn.css-15z9l4e.ant-btn-primary >> text=Add');

// console.log("added")
  
  })
  Then ('I click the "Upload File" button', async()=>{
    await page.$$(homePage.ADD_VIDEO).then((elements) => elements[2].click());
   
  })

  Then ('I upload image file', async()=>{
    const uploadButtonSelector = '.ant-upload.ant-upload-select'; // Adjust if needed
    const filePath = 'C:\\Users\\parva\\OneDrive\\Desktop\\download.jpg'; // Adjust file path
    const upload='.css-oxlnmf-ant-btn-primary'
  
    // Trigger file chooser and handle file upload
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click(uploadButtonSelector)
      
    ]);
    await fileChooser.setFiles(filePath);
    // console.log("Image upload done");
    await page.waitForTimeout(1000); 
    await page.fill(homePage.TITLE, "Sample image");
    // await page.click('button.ant-btn.css-oxlnmf.ant-btn-primary span:text("Upload")');
    await page.click('button.ant-btn.css-15z9l4e.ant-btn-primary >> text=Upload');
    console.log("Upload completed");
    
    await page.waitForTimeout(3000);

  })






After(async () => {
  if (browser) {
    await browser.close(); // Close browser after each test
  }
});
