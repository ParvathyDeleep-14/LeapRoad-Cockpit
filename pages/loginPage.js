const BasePage = require("./basePage");
const { test, expect } = require("@playwright/test");
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.pageTitle = "h1";
   
  }
  LOGIN_URL = "https://dev-cockpit.leaproad.net/login";
  USERNAME_INPUT = 'input[placeholder="user@leaproad.com"]';
  PASSWORD_INPUT = 'input[placeholder="Enter password"]';
  LOGIN_BUTTON = ".submit-button";
  HOME_URL = "https://dev-cockpit.leaproad.net";
  ERROR_MESSAGE = ".ant-notification-notice-content";
  USERNAME_LOGOUT = ".username";
  LOGOUT_BUTTON = ".ant-dropdown-menu-item-only-child";

  async goToLoginPage(page) {
    await this.page.goto(this.LOGIN_URL);
    await this.page.waitForNavigation({ waitUntil: "networkidle" });
  }
  async enterCredentials(username, password) {
    await this.page.fill(this.USERNAME_INPUT, username);
    await this.page.fill(this.PASSWORD_INPUT, password);
  }
  async clickLoginButton(page) {
    await this.page.click(this.LOGIN_BUTTON);
    await this.page.waitForTimeout(1000);
  }
//   async verifyLoginFailure(page) {
//     await expect(this.page.locator(this.ERROR_MESSAGE)).toBeVisible();
//     const errorText = await this.page.locator(this.ERROR_MESSAGE).innerText();
//     console.log("Error Message:", errorText);
//     console.log("Login Failed");
    async getErrorMessage() {
        return this.page.locator(this.ERROR_MESSAGE).innerText();
  }
  async verifyLoginSuccess(page) {
    await expect(this.page).toHaveURL(this.HOME_URL, { timeout: 20000 });
    console.log("Login Successful");
  }

  async logOut(page) {
    await this.page.click(this.USERNAME_LOGOUT);
    await this.page.click(this.LOGOUT_BUTTON);
  }
}
module.exports = LoginPage;




