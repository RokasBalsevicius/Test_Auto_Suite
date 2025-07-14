const {Given, When, Then} = require("@wdio/cucumber-framework");
const { modalCloser, visibilityChecker } = require('../../utils/helpers.js');
const PageObject = require('../../page_objects/topocentrasPage.obj.js');

Given(/^User starts on the main page of Topocentras.lt$/, async() => {
    await PageObject.openPage('/')
    await modalCloser(PageObject.cookieModalWrapper, PageObject.cookieModalCloseBtn);
    await expect(browser).toHaveTitle("TOPOCENTRAS.LT - Internetinė parduotuvė")
})

When(/^User clicks "Prisijungti" on the main page$/, async() => {
    await visibilityChecker(PageObject.headerLoginBtn);
    await PageObject.headerLoginBtn.click()
})

Then(/^User can see login modal$/, async() => {
    await visibilityChecker(PageObject.loginModal);
})

Then(/^User enters valid username, password and clicks login button$/, async(dataTable) => {
    const {username, password} = dataTable.rowsHash();
    await PageObject.loginAction(username, password)
})

Then(/^User is logged in and sees Profile and Logout buttons$/, async() => {
    const buttonsList = [PageObject.profileBtn, PageObject.logoutBtn]
    for(const btn of buttonsList) {
        await visibilityChecker(btn);
    }
})

Then(/^User is able to logout$/, async() => {
    await visibilityChecker(PageObject.logoutBtn);
    await PageObject.logoutBtn.click();
    await visibilityChecker(PageObject.loginModal);
})