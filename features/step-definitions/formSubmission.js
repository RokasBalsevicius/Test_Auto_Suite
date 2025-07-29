const {Given, When, Then} = require('@wdio/cucumber-framework');
const PageObject = require('../../page_objects/DemoQA.obj.js');
const { visibilityChecker } = require('../../utils/helpers.js');

Given(/^User starts at the page with an empty form$/, async() => {
    await PageObject.openPage('automation-practice-form')
})

When(/^User fills in the form correctly$/, async() => {
    await PageObject.checkRequiredElementsVisibility();
    await PageObject.fillForm();
});

Then(/^User can see successfully submitted form confirmation modal$/, async() => {
    await visibilityChecker(PageObject.submittedFormModal);
    const confirmationText = await PageObject.formSubmitConfirmation.getText();
    expect(confirmationText.toLowerCase()).toContain('thanks for submitting the form');
});

Then(/^User closes form submission confirmation modal$/, async() => {
    const isVisible = await visibilityChecker(PageObject.confirmationModalCloseBtn);
    if(!isVisible) {
        await PageObject.confirmationModalCloseBtn.scrollIntoView();
    }
    await PageObject.confirmationModalCloseBtn.click();
})

Then(/^Form submission confirmation modal no longer displayed$/, async() => {
    const stillVisible = await visibilityChecker(PageObject.submittedFormModal);
    expect(stillVisible).toBeFalsy();
})