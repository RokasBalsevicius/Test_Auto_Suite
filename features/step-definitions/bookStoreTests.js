const { Given, When, Then } = require('@wdio/cucumber-framework');
const PageObject = require('../../page_objects/BookStore.obj.js');
const { visibilityChecker } = require('../../utils/helpers.js')

Given(/^User starts at Book Store registration page$/, async() => {
    await PageObject.openPage('register');
    const elements = [
        PageObject.firstnameInputField, 
        PageObject.lastnameInputField, 
        PageObject.usernameInputField, 
        PageObject.passwordInputField, 
        PageObject.registerBtn, 
        PageObject.gotologinBtn
    ];
    for(const el of elements) {
        await visibilityChecker(el);
    };
})

When(/^User fills all registration fields and clicks "Register"$/, async() => {
    await PageObject.fillRegistrationForm();
})

Then(/^User gets an alert indicating about successful registration$/, async() => {
    await browser.pause(2000)
    try {
        const alertText = await browser.getAlertText();
        console.log('Alert text:', alertText);
        await browser.acceptAlert();
        console.log('alert closed');
        await browser.pause(2000);
    } catch (err) {
        const errorText = await $('#name').getText();
        console.warn('No alert. Error message on page:', errorText);
        throw new Error(`Expected alert, but none appeared. Page said: ${errorText}`);
    }
})

When(/^User goes to login page from registration page$/, async() => {
    await visibilityChecker(PageObject.gotologinBtn);
    await PageObject.gotologinBtn.click();
})

Then(/^User is redirected to Login page$/, async() => {
    const elements = [PageObject.usernameInputField, PageObject.passwordInputField, PageObject.loginBtn];
    for(const el of elements) {
        await visibilityChecker(el);
    }
})

When(/^User fills login form and clicks login button$/, async() => {
    await PageObject.fillLoginForm();
    await browser.pause(3000);
})

Then(/^User is able to successfully login$/, async() => {
    await visibilityChecker(PageObject.loggedInNameTag);
    await browser.pause(3000)
})


