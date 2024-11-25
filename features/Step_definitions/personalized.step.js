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


Given("I am logged in to leaproad account", { timeout: 10000 }, async () => {
    const browserData = await launchBrowser(false);
    browser = browserData.browser;
    page = browserData.page;
    homePage = new HomePage(page);
    videoPage = new VideoPage(page);
    // Use leaproadLogin helper to log in
    // console.log("sample tester");
    await leaproadLogin(page, "leaproadexpert@gmail.com", "LeapRoadAdmin@123");
  });

  When ('I navigate to the video page',{timeout:1000}, async()=>{
    await page.waitForTimeout(2000)
    await page.click('span:has-text("Videos")');

    
  })
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
  Then ('I click onn {string}', async(subtitle)=>{
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
    //     await page.$$(audio).then((elements)=>elements[0].click())
    //     console.log("Audio selection done");
        
    // }
    // else{
    //     console.log("Not found");
    // }
    





After(async () => {
    if (browser) {
        await browser.close();  // Close browser after each test
    }
});