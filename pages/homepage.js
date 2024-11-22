//const { timeout } = require("../playwright.config");
const BasePage = require("./basePage");
const { test, expect } = require("@playwright/test");
const { uploadFile } = require("../utils/helpers");
const { timeout } = require("../playwright.config");

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = "h1";
  }
  CREATE_JOURNEY = ".ant-btn-primary.create-button";
  JOURNEY_NAME = '[placeholder="Enter journey Name"]';
  DROP_DOWN = ".ant-select-allow-clear.ant-select-show-arrow";
  RELATIONSHIPS = '[title="Relationships"]';
  BUTTON = 'button:has-text("Create Journey")';
  MORE_ICON = ".ant-dropdown-trigger";
  DELETE = ".ant-dropdown-menu-item-only-child";
  DELETE_CONFIRM = ".ant-btn.css-1vndjwp.ant-btn-primary";
  Q1 = '[placeholder="Type question 1 here"]';
  S1 = '[placeholder="Enter the name of section 1 here"]';
  M1 = '[placeholder="Enter the name of milestone 1 here"]';
  P1 = '[placeholder="Enter the name of prompt 1 here"]';
  SAVE_CHANGES = ".ant-btn.css-1vndjwp.ant-btn-default";
  CHAT = '[placeholder="Type here"]';
  SEND = ".send-button";
  ADD_BUTTON = ".add-button";
  DELETE_ADDQUESTION = ".delete";
  ADD_VIDEO = ".add-button.video-upload";
  BROWSE_FILE = ".ant-upload.ant-upload-select";
  FILE_UPLOAD_VERIFY = ".image-name";
  TITLE = '[placeholder="Enter a title"]';
  UPLOAD = ".ant-btn.css-1vndjwp.ant-btn-primary";
  CHAT_CONTENT = ".chat-content";
  ADDVIDEO_ADD = ".ant-segmented-item-label";
  JOURNEY_TRAINING_DROPDOWN = ".ant-select-multiple.ant-select-show-arrow";
  JOURNEY_VIDEO_SELECTION = ".ant-select-item.ant-select-item-option";
  SELECT_TRAINING = ".ant-select-item-option-content";
  LINK1 = '[placeholder="Enter video Url 1 here"]';
  BACK_BUTTON = ".back-button";
  EDIT_JOURNEY = 'button:has-text("Edit Journey")';
  // ADD_IMAGE='.ant-btn.css-1vndjwp.ant-btn-default'
  ADD_IMAGE = ".omt.ant-btn-default";
  ADD_IMAGE1 = ".ant-btn.ant-btn-primary";
  CHAT_CONTENT = ".chat-content";
  HOME_URL = "https://dev-cockpit.leaproad.net";

  async createJourney(page) {
    console.log("test");

    await page.click(this.CREATE_JOURNEY);
    // await this.page.click('//button[span[text()="Create New Journey"]]')
    await this.page.waitForTimeout(2000);
    const timestamp = Date.now();
    console.log(timestamp);
    const uniqueJourneyName = `Sample Journey${timestamp}`;
    await page.waitForSelector('[placeholder="Enter journey Name"]', {
      timeout: 30000,
    });
    await this.page.click(this.JOURNEY_NAME);
    await this.page.fill(this.JOURNEY_NAME, uniqueJourneyName);
    await this.page.waitForTimeout(1000);
    await this.page.click(this.DROP_DOWN);
    await this.page.click(this.RELATIONSHIPS);
    await this.page.waitForTimeout(1000);
    await this.page.click(this.BUTTON);
    await this.page.waitForTimeout(2000);

    return uniqueJourneyName;
  }
  async getErrorMessage() {
    // Check if the error message is visible
    const errorMessageVisible = await this.page.isVisible(
      'text="Journey with the same name already exists"'
    );
    if (errorMessageVisible) {
      console.log("Journey with the same name already exists");
      return "Journey with the same name already exists";
    }

    // Check if the success message is visible
    const successMessageVisible = await this.page.isVisible(
      'text="Successfully created journey"'
    );
    if (successMessageVisible) {
      console.log("Journey creation successful");
      await this.page.waitForTimeout(3000);
      return "Successfully created journey";
    }

    // Return null if neither message is visible
    return null;
  }

  async addImage(page) {
    await this.page.$$(this.ADD_IMAGE1).then((elements) => elements[1].click());
    await this.page.waitForTimeout(2000);
    await this.page.setInputFiles(
      'input[type="file"]',
      "C:\\Users\\parva\\Downloads\\IP.jpg"
    );
    const materialReceiptElements = await this.page.$$(
      ".ant-btn.css-1vndjwp.ant-btn-default"
    );
    console.log(
      `Found material receipt elements: ${
        materialReceiptElements ? materialReceiptElements.length : 0
      }`
    );

    if (materialReceiptElements && materialReceiptElements.length > 1) {
      const uploadedFileName = await materialReceiptElements[2].evaluate(
        (el) => el.textContent
      );
    } else {
      throw new Error(
        "Material receipt elements not found or insufficient elements"
      );
    }
    await this.page.$$(this.ADD_IMAGE1).then((elements) => elements[1].click());
  }
  //   async addImageVerify(page) {
  //     await expect(this.page.locator(this.FILE_UPLOAD_VERIFY)).toBeVisible();
  //     await this.page.fill(this.TITLE, "Profile image");
  //     await this.page.$$(this.UPLOAD).then((elements) => elements[1].click());
  //     await this.page.waitForTimeout(3000);
  //     const fileName = "IP.jpg";
  //     const fileSelector = `text="${fileName}"`; // A text selector for the file name
  //     await this.page.waitForTimeout(6000);

  //     await this.page.waitForSelector(fileSelector); // Wait for the file name to be visible on the page
  //     // Verify the file is present in the UI
  //     const isFileListed = await this.page.isVisible(fileSelector, {
  //       timeout: 6000,
  //     });
  //     console.log("File is visible");
  //   }

  async addContent(page) {
    await this.page.fill(this.CHAT, "Hi");
    await this.page.click(this.SEND);
    await this.page.waitForTimeout(2000);
    const elements = await this.page.$$(this.CHAT_CONTENT);
    if (elements.length > 1) {
      const isVisible0 = await elements[0].isVisible();
      const isVisible1 = await elements[1].isVisible();
      expect(isVisible0).toBe(true);
      expect(isVisible1).toBe(true);
      console.log("Chat content is visible");
    }
    await expect(this.page.locator(this.CHAT_CONTENT)).toBeVisible();
    await this.page.fill(this.S1, "sample section");
    await this.page.waitForTimeout(2000);
    await this.page.$$(this.ADD_BUTTON).then((elements) => elements[0].click());
    await this.page.waitForTimeout(3000);
    await this.page.click(this.DELETE_ADDQUESTION);
    await this.page.fill(this.S1, "sample section");
    await this.page.waitForTimeout(3000);
    await this.page.fill(this.M1, "sample milestone");
    // await this.page.waitForTimeout(3000);
    await this.page.$$(this.ADD_VIDEO).then((elements) => elements[1].click());
    await this.page.fill(
      this.LINK1,
      "https://youtu.be/oV74Najm6Nc?si=VM3UfAVMsowVWT3Q"
    );
    await this.page.click(this.ADD_VIDEO);
  }

  // await uploadFile(page,'C:\\Users\\parva\\Downloads\\Jumping Jacks.mp4',this.BROWSE_FILE);
  // await this.page.setInputFiles(
  //   'input[type="file"]',
  //   "C:\\Users\\parva\\Downloads\\Jumping Jacks.mp4"
  // );
  // const profilePictureElements = await this.page.$(this.BROWSE_FILE);
  // expect(profilePictureElements).not.toBeNull();
  // expect(await profilePictureElements.isVisible()).toBeTruthy();
  async verifyContent(page) {
    await expect(
      this.page.locator(this.FILE_UPLOAD_VERIFY).getByText("Jumping Jacks.mp4")
    ).toBeVisible();
    await this.page.fill(this.TITLE, "Sample video");
    await this.page.$$(this.UPLOAD).then((elements) => elements[2].click());
    await this.page.waitForTimeout(3000);
    const fileName = "Jumping Jacks.mp4";
    const fileSelector = `text="${fileName}"`; // A text selector for the file name
    await this.page.waitForTimeout(3000);

    await this.page.waitForSelector(fileSelector); // Wait for the file name to be visible on the page

    // Step 4: Verify the file is present in the UI
    const isFileListed = await this.page.isVisible(fileSelector, {
      timeout: 6000,
    });
    console.log("File is visible");
  }
  async addFile(page) {
    await this.page.$$(this.ADD_VIDEO).then((elements) => elements[2].click());
  }
  async addFileVerifyContent(page) {
    await expect(this.page.locator(this.FILE_UPLOAD_VERIFY)).toBeVisible();
    await this.page.fill(this.TITLE, "Sample image");
    await this.page.$$(this.UPLOAD).then((elements) => elements[1].click());
    await this.page.waitForTimeout(3000);
    const fileName = "diet.jpg";
    const fileSelector = `text="${fileName}"`; // A text selector for the file name
    await this.page.waitForTimeout(6000);

    await this.page.waitForSelector(fileSelector); // Wait for the file name to be visible on the page

    // Step 4: Verify the file is present in the UI
    const isFileListed = await this.page.isVisible(fileSelector, {
      timeout: 6000,
    });
    console.log("File is visible");
  }

  // await this.page.click(this.BROWSE_FILE)

  // await fileInput.setInputFiles('"C:\Users\parva\Downloads\Jumping Jacks.mp4"'); // Replace with the actual file path
  // await this.page.waitForTimeout(3000)

  // Submit the form or click the upload button if necessary
  // await page.click('button[type="submit"]'); // Replace with the actual upload button selector

  // Wait for the file upload confirmation or any success message
  // await expect(page.locator('text="Upload successful"')).toBeVisible();
  // await this.page.fill(this.P1,"sample prompt")
  // await this.page.waitForTimeout(3000);
  async addVideo(page) {
    await this.page.click(this.ADD_VIDEO);
    await this.page
      .$$(this.ADDVIDEO_ADD)
      .then((elements) => elements[1].click());
    // await this.page
    //   .$$(this.JOURNEY_TRAINING_DROPDOWN)
    //   .then((elements) => elements[0].click());
    // // await this.page.$$(this.JOURNEY_VIDEO_SELECTION).then((elements)=> elements[5].click())
    // // await this.page.click('text="no title"');
    // await this.page.click('text="milestone"');
    // await this.page
    //   .$$(this.JOURNEY_TRAINING_DROPDOWN)
    //   .then((elements) => elements[0].click());
    await this.page
      .$$(this.JOURNEY_TRAINING_DROPDOWN)
      .then((elements) => elements[1].click());
    // Locate the option by its title and click it
    await page
      .locator('div[title="leaproad_video_LeapRoad_Expert_20240925_081428"]')
      .click();

    await this.page
      .$$(this.JOURNEY_TRAINING_DROPDOWN)
      .then((elements) => elements[1].click());
    await this.page.$$(this.UPLOAD).then((elements) => elements[2].click());
    await this.page.waitForTimeout(3000);
  }
  async concludeJourney(page) {
    await this.page
      .$$(this.SAVE_CHANGES)
      .then((elements) => elements[0].click());
    console.log("Saved changes");
    await this.page.waitForTimeout(3000);
    await this.page.$$(this.UPLOAD).then((elements) => elements[0].click());
    await this.page.$$(this.UPLOAD).then((elements) => elements[2].click());
    await this.page.waitForTimeout(6000);
    // await this.page.$$(this.MORE_ICON).then((elements) => elements[1].click());
    // await this.page.click('text="Delete"');
    // await this.page
    //   .$$(this.DELETE_CONFIRM)
    //   .then((elements) => elements[1].click());
    // // await this.page.waitForTimeout(15000);
    // console.log("Journey deleted");
    // await this.page.waitForSelector('text="Successfully deleted journey"', {
    //   timeout: 15000,
    // });
  }
  async backToHomePage(page) {
    await this.page.click(this.BACK_BUTTON);
    await this.page.waitForTimeout(5000);
    // await page.locator('tr[data-row-key="6704e2025353fb9a41f9339c"]').click();
    // await page.locator('tr[data-row-key="6704fca417fda441ce648289"] a').click();
    await page
      .locator('svg[xmlns="http://www.w3.org/2000/svg"]')
      .nth(17)
      .click();

    // await page.locator('a[href="/660319e471fc896707948c44/view/6704e2025353fb9a41f9339c"]').click();

    // await this.page.click(this.EDIT_JOURNEY);
  }
}

module.exports = HomePage;
