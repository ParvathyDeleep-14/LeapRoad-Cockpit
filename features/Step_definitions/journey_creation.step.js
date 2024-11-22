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
  console.log("sample tester");
  await leaproadLogin(page, "leaproadexpert@gmail.com", "LeapRoadAdmin@123");
});

// Given('I am on the journey creation page', { timeout: 10000 }, async () => {
//     await homePage.createJourney();  // Calls the createJourney function from your page object
// });

When('I click on "Create New Journey"', { timeout: 30000 }, async () => {
  //   const browserData = await launchBrowser(false);
  //   browser = browserData.browser;
  //   page = browserData.page;
  //   homePage = new HomePage(page);
  //   await homePage.goToHomePage();  // Now has increased timeout in goToLoginPage()
  //   await homePage.createJourney(page); // Assuming CREATE_JOURNEY is the selector
  await page.click(homePage.CREATE_JOURNEY);
});

// When("I fill in a unique journey name", async () => {
//   const timestamp = Date.now();
//   const uniqueJourneyName = `Sample Journey ${timestamp}`;
//   await page.fill(homePage.JOURNEY_NAME, uniqueJourneyName);
//   await page.waitForTimeout(1000); // Adjust timeout as per your application's response time
// });

When("I fill in a {string}", { timeout: 120000 }, async (string) => {
  const timestamp = Date.now();
  const uniqueJourneyName = `SampleJourney${timestamp}`;
  console.log(uniqueJourneyName);

  // Assuming 'JOURNEY_NAME' is the input field selector
  // await this.page.waitForTimeout(1000)
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('[placeholder="Enter journey Name"]', {
    timeout: 120000,
  });
  await page.fill('[placeholder="Enter journey Name"]', uniqueJourneyName);

  // Optional: log the generated unique name
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

// Then("if a journey with the same name exists", async () => {
//   const errorMessage = await homePage.getErrorMessage();
//   if (errorMessage === "Journey with the same name already exists") {
//     console.log("Duplicate journey error encountered.");
//   } else {
//     throw new Error("Unexpected error message: " + errorMessage);
//   }
// });
Then("if a journey with the same name exists", async () => {
  const errorMessage = await homePage.getErrorMessage();

  if (errorMessage === "Journey with the same name already exists") {
    console.log("Duplicate journey error encountered.");
  } else if (errorMessage === "Successfully created journey") {
    console.log("Journey was created successfully");
    // Handle this situation as needed, possibly throw an error if this is not expected.
    //     throw new Error("Expected duplicate journey error but got success message.");
    // } else {
    //     throw new Error("Unexpected error message: " + errorMessage);
  }
});

// Then('I should see an error message {string}', async (expectedMessage) => {
//     // Check if the error message is visible and get its text
//     const errorMessageVisible = await homePage.page.isVisible('text="Journey with the same name already exists"');
//         console.log("Error message displayed correctly: " );

// })

Then("I should see an error message {string}", async (expectedMessage) => {
  // Check if the error message is visible
  const errorMessageVisible = await homePage.page.isVisible(
    'text="Journey with the same name already exists"'
  );

  // If the error message is visible, log the success message
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
  console.log("Message send");
});

Then("I should see the chat content visible", async () => {
  // Use a valid selector for the chat content
  const chatContentElements = await page.$$(homePage.CHAT_CONTENT);

  // Check if the elements are found
  if (chatContentElements.length > 0) {
    visibleMessages = [];
    for (const element of chatContentElements) {
      // Check if the element is visible
      const isVisible = await element.isVisible();
      if (isVisible) {
        // Get and print the text of the visible chat content
        const textContent = await element.textContent();
        console.log("Chat content is visible:", textContent);
        // Optionally assert that the text is not empty
        expect(textContent).toBeTruthy();
        visibleMessages.push(textContent);
      } else {
        console.log("Chat content is not visible");
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
// await page.$$(homePage.ADD_BUTTON).then((elements) => elements[0].click());
// await page.waitForTimeout(3000);
await page.waitForSelector(homePage.ADD_BUTTON, { visible: true });

  // Find the button and click it
  const elements = await page.$$(homePage.ADD_BUTTON);
  if (elements.length > 0) {
    await elements[0].click();
  } else {
    throw new Error('Add button not found');
  }

  // Optional: Add some wait to ensure the action completes
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
console.log("content created");

})
Then ('I add a video url',async()=>{
    await page.$$(homePage.ADD_VIDEO).then((elements) => elements[1].click());
    await page.fill(
      homePage.LINK1,
      "https://youtu.be/oV74Najm6Nc?si=VM3UfAVMsowVWT3Q"
    );
})

// Then ('I upload file', async (page, uploadPath, browse)=>{
//     await uploadFile(page,'C:\\Users\\parva\\Downloads\\Jumping Jacks.mp4','.ant-upload.ant-upload-select');
//     })
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
    // Using helper function to set the file
    await fileChooser.setFiles(filePath);
    console.log("video upload done");
    await page.waitForTimeout(1000); 
    await page.fill(homePage.TITLE, "Sample video");
    await page.click('button.ant-btn.css-oxlnmf.ant-btn-primary span:text("Upload")');
    await page.waitForTimeout(3000);
    
  });
  
  Then ('I click the "Add Video" button', async()=>{
    // await page
    //   .$$(homePage.ADDVIDEO_ADD)
    //   .then((elements) => elements[1].click());
    await page.click('div.ant-segmented-item-label[title="Add"]');

    })
  Then ('I click the drop down and select a journey video option from the dropdown', async()=>{
    // await page
    //   .$$(homePage.JOURNEY_TRAINING_DROPDOWN)
    //   .then((elements) => elements[0].click());
    // await page.click('button.ant-select-selection-placeholder span:text("Select a video")');
    // await page.click('div.ant-select-selection-overflow');


    // await page.$$(homePage.JOURNEY_VIDEO_SELECTION).then((elements)=> elements[5].click())
    // await page.click('text="no title"');
    // console.log("Video 1 upload done");
    // await page.click('div.ant-select-item[title="milestone"]',{timeout:2000})
    await page.click('div.ant-select-selection-overflow');
    await page.click('text="no title"');
    await page.click('div.ant-select-selection-overflow');

await page.click('button.ant-btn.css-oxlnmf.ant-btn-primary span:text("Add")');


// await page.evaluate(() => {
//   const dropdown = document.querySelector('div.ant-select-selection-overflow'); // Adjust the selector for the dropdown
//   const videoOption = dropdown.querySelector('text="milestone"'); // Adjust for your video option

//   // Scroll the video option into view
//   videoOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// });
// await page.click('text="milestone"');
//     console.log("Video 2 upload done");
  })
  Then ('I click the drop down and select a training video option from the dropdown', async ()=>{
    // const arrow='.ant-select-arrow'
    // await page
    // .$$(arrow)
    // .then((elements) => elements[4].click());
    const elements = await page.$$('div.ant-select-selection-overflow');
if (elements.length > 1) {
    await elements[1].click(); // Click the second element
}
  console.log("clicked");
await page
.locator('div[title="leaproad_video_LeapRoad_Expert_20240925_081428"]')
.click();
// await page.click('.ant-select-selection-overflow-item-suffix .ant-select-selection-search-input');
// if (elements.length > 1) {
    await elements[1].click(); // Click the second element
// }
await page.click('button.ant-btn.css-oxlnmf.ant-btn-primary span:text("Add")');
console.log("added")
  
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
    // Using helper function to set the file
    await fileChooser.setFiles(filePath);
    console.log("Image upload done");
    await page.waitForTimeout(1000); 
    await page.fill(homePage.TITLE, "Sample image");
    await page.click('button.ant-btn.css-oxlnmf.ant-btn-primary span:text("Upload")');
    console.log("Upload completed");
    
    await page.waitForTimeout(3000);

  })
//   Then ('I click the dropdown', async()=>{
//     await page.click('.ant-select-outlined.css-oxlnmf ant-select-single')
// //     // Wait for the dropdown to appear to ensure it's loaded
// // // Increase the timeout duration to 10 seconds
// // await page.waitForSelector('span.ant-select-arrow', { visible: true, timeout: 10000 });

// // const dropdownArrow = await page.$('span.ant-select-arrow');
// // if (dropdownArrow) {
// //     // Use JavaScript to scroll into view and click, in case the element is hidden or obscured
// //     await page.evaluate((arrow) => arrow.click(), dropdownArrow);
// // } else {
// //     console.log("Dropdown arrow not found.");
// // }


// //     await page.waitForTimeout(5000)
// //     // Click the dropdown arrow to open the dropdown menu
// // // Click the dropdown arrow to open the dropdown menu
// //     await page.click('span.ant-select-arrow');
// //     await page.click('text="PPT"');
//     console.log("PPT");
//   })

//   Then ('I upload PPT file' , async()=>{
//     const uploadButtonSelector = '.ant-upload.ant-upload-select'; // Adjust if needed
//     const filePath = 'C:\\Users\\parva\\Downloads\\668bb3fe0d70ee5aa0114627_1720431614620 (6).pptx'; // Adjust file path
//     const upload='.css-oxlnmf-ant-btn-primary'
// // Click the dropdown to expand it
//     await page.click('div.ant-select.ant-select-outlined.css-oxlnmf.ant-select-single.ant-select-show-arrow');
//     await page.click('text="PPT"');
//     console.log("PPT");
    
    
//     // Trigger file chooser and handle file upload
//     const [fileChooser] = await Promise.all([
//       page.waitForEvent('filechooser'),
//       page.click(uploadButtonSelector)
      
//     ]);
//     // Using helper function to set the file
//     await fileChooser.setFiles(filePath);
//     console.log("Image upload done");
//     await page.waitForTimeout(1000); 
//     await page.fill(homePage.TITLE, "Sample image");
//     await page.click('button.ant-btn.css-oxlnmf.ant-btn-primary span:text("Upload")');
//     console.log("Upload completed");
    
//     await page.waitForTimeout(3000);

//   })


When ('I navigate to video page', async()=>{
await page.click('li.ant-menu-item:has(span.ant-menu-title-content:has-text("Videos"))');


})
Then('I click on {string} button', async (buttonText) => {
    await page.click(`span:has-text("${buttonText}")`);
  });
Then ('I fill the title' , async()=>{
    const title = '[placeholder="Enter the title"]';
    await page.click(title)
    await page.fill(title,"Sample video")

})
Then('I choose training from dropdown', async () => {
    await page.click('div.ant-select-selector:has(span.ant-select-selection-placeholder:has-text("Select video type"))');
    await page.click('text="Training"');
  });
  Then('I click {string} button', async (buttonText) => {
    await page.click(`span:has-text("${buttonText}")`);
  });
  Then ('I click on the sample personalized video', async()=>{
    await page.click('span:has-text("Sample personalized video")')
  })
  Then ('I enter the script', async()=>{
    // const script='.DraftEditor-root'
    await page.waitForTimeout(3000)
    await page.click('.DraftEditor-root'); // Click into the editor to focus
await page.type('.DraftEditor-root', 'This is a sample script to generate audio');


  })
  Then ('I select the script', async()=>{
    await page.keyboard.down('Control');  
await page.keyboard.press('a');
await page.keyboard.up('Control');
  })
  Then ('I click on {string}', async(subtitle)=>{
    await page.click(`span:has-text("${subtitle}")`)
    // console.log("Subtitle added");
    
    })
    Then('I click {string}', async(prompt)=>{
    await page.click(`span:has-text("${prompt}")`)
    }) 
    Then ('I give the video prompt', async()=>{
      const prompt='[placeholder="Enter the video prompt..."]'
      await page.fill(prompt,"AI")
    //   console.log("Video prompt input done");
      
      
    })
    Then ('I click on the {string} button', async(stockbutton)=>{
       await page.click(`span:has-text("${stockbutton}")`)
    //    await page.waitForTimeout(100000)
    // Pause the screen to inspect or debug
// await page.pause();
       await page.waitForLoadState('load');

    })
    Then ('I select one of the prompts',  async()=>{
      await page.waitForSelector('span:has-text("Select")')
      console.log("Prompt upload done");
      
    })
    Then ('I {string}',{timeout:20000}, async(save)=>{
    await page.click(`span:has-text("${save}")`)
    console.log("Save video");
    
    })
    Then ('I select audio profile', async()=>{
        await page.click('span:has-text("Select Audio Profile")')

        const selectButtonSelector = 'button.audio-profile-modal__select-button';

        // await page.waitForSelector(selectButtonSelector, { state: 'visible' });
        await page.click(selectButtonSelector);
        await page.click('span:has-text("Continue")')
    })
        
    Then ('I click confirm script button', async()=>{
        await page.click('span:has-text("Confirm Script")')

    })
    Then ('I click Add Slide', async()=>{
        await page.click('span:has-text("Add Slide")')
    })
    Then ('I upload slide', async()=>{
        const uploadButtonSelector = '.ant-upload.ant-upload-select'; // Adjust if needed
    const filePath = 'C:\\Users\\parva\\Downloads\\668bb3fe0d70ee5aa0114627_1720431614620 (6).pptx'; // Adjust file path
    const upload='.css-oxlnmf-ant-btn-primary'
  
    // Trigger file chooser and handle file upload
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click(uploadButtonSelector)
      
    ]);
    // Using helper function to set the file
    await fileChooser.setFiles(filePath);
    console.log("Image upload done");
    await page.waitForTimeout(1000); 
    await page.click('button.ant-btn.css-gvwo4x.ant-btn-primary span:text("Upload")');
    console.log("Upload completed");
    
    await page.waitForTimeout(3000);

    })
    
    
    Then ('I choose DIY from dropdown', async()=>{
        // await page.click('div.ant-select-selector:has(span.ant-select-selection-placeholder:has-text("Select video type"))');
        await page.click(videoPage.SELECT_VIDEO_TYPE)
        await page.click(videoPage.DIY);
    })
        Then ('I click create video button', async()=>{
            await page.click(videoPage.CREATE_VIDEO)
        })
        
    
    Then ('I provide sample answers', async()=>{
        await page.click(videoPage.ANSWER)
        await page.fill(videoPage.ANSWER, "Sample answer")  
              
    })
 

    
        


    // const audio_list='.ant-spin-nested-loading-css-gvwo4x'
    // const audio='.modal__select'
    // await page.click('span:has-text("Select Audio Profile")')
    // const audioListVisible = await page.isVisible(audio_list)
    // if(audioListVisible){
    //     console.log("Audio list is visible");
        // await page.$$(audio).then((elements)=>elements[0].click())
    //     console.log("Audio selection done");
        
    // }
    // else{
    //     console.log("Not found");
    // }
    






After(async () => {
  if (browser) {
    await browser.close(); // Close browser after each test
  }
});
