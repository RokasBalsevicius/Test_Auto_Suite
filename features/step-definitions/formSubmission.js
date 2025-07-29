const {Given, When, Then} = require('@wdio/cucumber-framework');
const PageObject = require('../../page_objects/DemoQA.obj.js');
const { visibilityChecker } = require('../../utils/helpers.js');



Given(/^User starts at the page with an empty form$/, async() => {
    await PageObject.openPage('automation-practice-form')
})

When(/^User fills in the form correctly$/, async() => {
    const genderBtns = await PageObject.genderRadioBtns();
    const hobbyBtns = await PageObject.hobbiesRadioBtns();
    const requiredElements = await PageObject.requiredElements({genderIndex: 1, hobbyIndex: 0});

    for(const element of requiredElements) {
        await element.scrollIntoView();
        console.warn(`currently checking visibility of element: ${element.selector}`)
        await visibilityChecker(element);
    }

    await PageObject.nameField.setValue('Test');
    await PageObject.surnameField.setValue('Tester')
    await PageObject.emailField.setValue('tester123@mail.com');
    await (await PageObject.randomRadioBtnSelector(genderBtns)).click();
    await PageObject.phoneNumberField.setValue('3701234567');
    await PageObject.dateOfBirthField.setValue('30 Jul 2000');
    await PageObject.subjectContainerField.setValue('Maths');
    await browser.keys('Enter');
    await (await PageObject.randomRadioBtnSelector(hobbyBtns)).click();
    await PageObject.formFileUploadBtn.setValue(PageObject.filePath);
    await PageObject.addressInputField.setValue('Test street 123.');
    await PageObject.stateField.click();
    await PageObject.stateOption.click();
    await PageObject.cityField.click();
    await PageObject.cityOption.click();
    await PageObject.formSubmitBtn.click();
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

Then(/^Form submission confirmation modalis no longer displayed$/, async() => {
    if(!await visibilityChecker(PageObject.submittedFormModal)) {
        return true;
    } else {
        throw new Error(`Form submission confirmation modal is still displayed - failed to close form submission confirmation modal.`)
    }
})