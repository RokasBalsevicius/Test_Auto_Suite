const { Given, When, Then } = require('@wdio/cucumber-framework');
const { visibilityChecker } = require('../../utils/helpers.js');
const PageObject = require('../../page_objects/herokuappPage.obj.js');

Given(/^User starts at the dedicated page for file upload test$/, async() => {
    await PageObject.openPage('/upload');
})

When(/^User selects a file to upload and submits$/, async() => {
    await PageObject.selectFileToUpload();
})

Then(/^User can see successfully uploaded file$/, async() => {
    const uploadConfirmation = PageObject.uploadConfirmationMsg;
    await visibilityChecker(uploadConfirmation);
    await expect(uploadConfirmation).toHaveTextContaining(PageObject.uploadConfirmationExpectedMsg);
})