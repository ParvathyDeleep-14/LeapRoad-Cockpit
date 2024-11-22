const { Given, When, Then, After } = require('@cucumber/cucumber');
const { leaproadLogin, launchBrowser } = require('../../utils/helpers');
const LoginPage = require('../../pages/loginPage');
const { expect } = require('@playwright/test');

let browser;
let page;
let loginPage;

// Step definition to navigate to login page with increased timeout
Given('I navigate to the login page', { timeout: 60000 }, async () => {
    const browserData = await launchBrowser(false);  // Launch browser via helper function
    browser = browserData.browser;
    page = browserData.page;
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();  // Now has increased timeout in goToLoginPage()

});

// Step definition for entering credentials
When('I enter the username {string} and password {string}', async (username, password) => {
    // await leaproadLogin(page, username, password);
    await loginPage.enterCredentials(username, password);
    await loginPage.clickLoginButton();
});

// Step definition for success message or homepage validation
Then('I should see a success message or the homepage',{ timeout: 30000 }, async () => {
    //const homepageElement = await loginPage.getHomepageElement();  // Assuming this function is implemented
    //expect(homepageElement).toBeVisible();
    await loginPage.verifyLoginSuccess(); 
});

// Step definition for login failure
Then('I should see a login error message {string}', async (expectedErrorMessage) => {
    await expect(loginPage.page.locator(loginPage.ERROR_MESSAGE)).toBeVisible();

  // Get the actual error message from the page
  const actualErrorMessage = await loginPage.page.locator(loginPage.ERROR_MESSAGE).innerText();

  // Normalize the error message to handle newlines and extra spaces
  const normalizedErrorMessage = actualErrorMessage.replace(/\n/g, ' ').trim();

  // Compare the actual error message with the expected error message
  expect(normalizedErrorMessage).toContain(expectedErrorMessage);

});

  

// Clean up after test
After(async () => {
    if (browser) {
        await browser.close();  // Close browser after each test
    }
});
