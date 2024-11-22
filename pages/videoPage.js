const BasePage = require("./basePage");
const { test, expect } = require("@playwright/test");
const { uploadFile } = require("../utils/helpers");
const { timeout } = require("../playwright.config");

class VideoPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = "h1";
  }
   TITLE = '[placeholder="Enter the title"]';
   PROMPT='[placeholder="Enter the video prompt..."]'
   SELECT = 'button.audio-profile-modal__select-button';
//    Video from sidebar
   VIDEO='li.ant-menu-item:has(span.ant-menu-title-content:has-text("Videos"))' 
   CREATE_NEW_VIDEO='span:has-text("Create New Video")' 
   SELECT_VIDEO_TYPE='div.ant-select-selector:has(span.ant-select-selection-placeholder:has-text("Select video type"))'
   DIY='text="DIY"'
   CREATE_VIDEO='span:has-text("Create Video")'
   ANSWER = '[placeholder="Enter your answer here"]';



async CreateTrainingVideo(page){
    await this.page.click('li.ant-menu-item:has(span.ant-menu-title-content:has-text("Videos"))');
        await this.page.click('span:has-text("Create New Video")');
        await this.page.click(this.TITLE)
        await this.page.fill(this.TITLE,"Sample personalized video")
        await this.page.click('div.ant-select-selector:has(span.ant-select-selection-placeholder:has-text("Select video type"))');
        await this.page.click('text="Training"');
        await this.page.click('span:has-text("Create Video")');

    
    }
async addSubtitle(page){


    await this.page.click('span:has-text("Sample personalized video")')
    await this.page.click('.DraftEditor-root'); // Click into the editor to focus
    await this.page.type('.DraftEditor-root', 'This is a sample script to generate audio');
    await this.page.waitForTimeout(3000)
    await this.page.keyboard.down('Control');  
    await this.page.keyboard.press('a');
    await this.page.keyboard.up('Control');
    await this.page.click('span:has-text("Subtitle")')


    
      }
async addPrompt(page){
    await this.page.click('span:has-text("Add Video")')
    await this.page.fill(prompt,"AI")
    await this.page.click('span:has-text("Get Stock Videos")')
    await this.page.waitForLoadState('load');
    await this.page.waitForSelector('span:has-text("Select")')
    await this.page.click('span:has-text("Save")',{timeout:20000})
    await this.page.click('span:has-text("Select Audio Profile")')
    await this.page.click(THIS.SELECT);
    await this.page.click('span:has-text("Continue")')            
    await this.page.click('span:has-text("Confirm Script")')
    
      }

    async addSlide(page){
        await page.click('span:has-text("Add Slide")')
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
          await this.page.waitForTimeout(1000); 
          await this.page.click('button.ant-btn.css-gvwo4x.ant-btn-primary span:text("Upload")');
          console.log("Upload completed");
          
          await this.page.waitForTimeout(3000);
      

    }
    async createDiyVideo(page){
        await this.page.click(this.VIDEO);
        await this.page.click(this.CREATE_NEW_VIDEO);
        await this.page.click(this.TITLE)
        await this.page.fill(this.TITLE,"Sample DIY video")
        await this.page.click(this.SELECT_VIDEO_TYPE);
        await this.page.click(this.DIY);
        await this.page.click(this.CREATE_VIDEO);
    }
    async answers(page){
        await this.page.click(this.ANSWER)
        await this.page.fill(this.ANSWER, "Sample answer")
    }
        
    
}  

module.exports = VideoPage;