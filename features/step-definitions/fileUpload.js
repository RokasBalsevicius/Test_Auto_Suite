const { Given, When, Then } = require('@wdio/cucumber-framework');
const { browserLoader, visibilityChecker } = require('../../utils/helpers.js');
const path = require('path');

Given(/^User starts at the dedicated page for file upload test$/, async() => {
    await browser.url('https://the-internet.herokuapp.com/upload');
    await browserLoader();
})

When(/^User selects a file to upload and submits$/, async() => {
    const filePath = path.join(__dirname, '../../test_files/sampleFile.pdf');
    console.log(`File path is - ${filePath}`);

    const chooseFileBtn = await $('#file-upload');
    await chooseFileBtn.waitForDisplayed({timeout: 5000});
    await chooseFileBtn.setValue(filePath);

    const uploadBtn = await $('#file-submit');
    await uploadBtn.waitForDisplayed({timeout: 5000});
    await uploadBtn.click();
    await browserLoader()
})

Then(/^User can see successfully uploaded file$/, async() => {
    const uploadConfirmation = await $('#uploaded-files');
    await visibilityChecker(uploadConfirmation);
    await expect(uploadConfirmation).toHaveTextContaining('sampleFile.pdf');
})