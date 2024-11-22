// const { Given, When, Then, After } = require("@cucumber/cucumber");
// const { leaproadLogin, launchBrowser } = require("../../utils/helpers");
// const {uploadFile}= require("../../utils/helpers")
// const LoginPage = require("../../pages/loginPage");
// const HomePage = require("../../pages/homepage");
// const { expect } = require("@playwright/test");
// const { setWorldConstructor } = require("@cucumber/cucumber");
// const { timeout } = require("../../playwright.config");

// let browser;
// let page;
// let loginPage;
// let homePage;


// Given("I am  logged in", { timeout: 10000 }, async () => {
//     const browserData = await launchBrowser(false);
//     browser = browserData.browser;
//     page = browserData.page;
//     homePage = new HomePage(page);
//     // Use leaproadLogin helper to log in
//     console.log("sample tester");
//     await leaproadLogin(page, "leaproadexpert@gmail.com", "LeapRoadAdmin@123");
//   });

//   When ('I navigate to the video page',{timeout:1000}, async()=>{
//     await page.waitForTime
//     await page.click('span:has-text("Videos")');

    
// //   })



// After(async () => {
//     if (browser) {
//         await browser.close();  // Close browser after each test
//     }
// });