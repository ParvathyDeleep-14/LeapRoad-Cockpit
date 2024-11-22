const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const LoginPage = require("../pages/loginPage");             

// Function to launch browser and create a new page
async function launchBrowser(headless = false) {
  const browser = await chromium.launch({ headless });
  const page = await browser.newPage();
  return { browser, page };
}

// Function to login
async function leaproadLogin(page, user, password) {
  const loginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.enterCredentials(user, password);
  await loginPage.clickLoginButton();
  await loginPage.verifyLoginSuccess();
}

// Function to upload a file
async function uploadFile(page, uploadPath, browse) {
  await page.setInputFiles('input[type="file"]', uploadPath);
  const profilePictureElements = await page.$(browse, { timeout: 5000 });
  expect(profilePictureElements).not.toBeNull();
  expect(await profilePictureElements.isVisible()).toBeTruthy();
}

// Export the functions
module.exports = {
  leaproadLogin,
  uploadFile,
  launchBrowser,  // Added this for browser reuse in step definitions
};
