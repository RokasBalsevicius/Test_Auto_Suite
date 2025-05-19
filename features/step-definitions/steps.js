const { Given, Then } = require('@wdio/cucumber-framework');

Given('I open the homepage', async () => {
    await browser.url('https://the-internet.herokuapp.com');
});

Then('the page title should be {string}', async (expectedTitle) => {
    const title = await browser.getTitle();
    expect(title).toBe(expectedTitle);
});