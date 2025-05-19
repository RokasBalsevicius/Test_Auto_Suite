const {Given, When, Then} = require("@wdio/cucumber-framework");
const {cookieModalCloser} = require('../../utils/helpers.js');

Given(/^User starts on the main page of Topocentras.lt$/, async() => {
    await browser.url('https://www.topocentras.lt/');
    await cookieModalCloser('.CybotCookiebotDialogContentWrapper', '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
    await expect(browser).toHaveTitle("TOPOCENTRAS.LT - Internetinė parduotuvė");
    

})

When(/^User clicks "Prisijungti" on the main page$/, async() => {
    const loginBtn = await $('[data-test-id="header-login-btn"]');
    await loginBtn.waitForDisplayed({timeout: 5000});
    expect(await loginBtn.isDisplayed()).toBe(true);

    await loginBtn.click();
})

Then(/^User can see login modal$/, async() => {
    const loginModal = await $('.Modal-modal-1aA.LoginModal-loginModal-2X8')
    await loginModal.waitForDisplayed({timeout: 4000});
    expect(await loginModal.isDisplayed()).toBe(true);
})

Then(/^User enters valid username and password$/, async(dataTable) => {
    const {username, password} = dataTable.rowsHash();
    const loginInput = await $('[data-test-id="username"]')
    const passInput = await $('[data-test-id="password"]');
    expect(await loginInput.isDisplayed()).toBe(true);
    expect(await passInput.isDisplayed()).toBe(true);

    await loginInput.setValue(username);
    await passInput.setValue(password);
})

Then(/^User clicks on Prisijungti button$/, async() => {
    const loginBtn = await $('[data-test-id="login-btn"]');
    expect(await loginBtn.isDisplayed()).toBe(true);
    await loginBtn.click();
})

Then(/^User is logged in and sees Profile and Logout buttons$/, async() => {
    const profileBtn = await $('[data-test-id="my-account-link"]');
    await profileBtn.waitForDisplayed({timeout: 5000})
    expect(await profileBtn.isDisplayed()).toBe(true);

    const logoutBtn = await $('[data-test-id="header-logout-btn"]');
    await logoutBtn.waitForDisplayed({timeout: 5000})
    expect(await logoutBtn.isDisplayed()).toBe(true);
})
Then(/^User is able to logout$/, async() => {
    const logoutBtn = await $('[data-test-id="header-logout-btn"]');
    expect(await logoutBtn.isDisplayed()).toBe(true)
    await logoutBtn.click();

    const loginModal = await $('.Modal-modal-1aA.LoginModal-loginModal-2X8');
    await loginModal.waitForDisplayed({timeout: 5000});
    expect(await loginModal.isDisplayed()).toBe(true)
})