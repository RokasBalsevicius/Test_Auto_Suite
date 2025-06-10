const {Given, When, Then} = require('@wdio/cucumber-framework');
const PageObject = require('../../page_objects/betsafePage.obj.js');
const PageNavigation = require('../../navigation/navigation.js')

Given(/^User starts at Betsafe.lt main page$/, async() => {
    await PageObject.openPage();
    await expect(PageObject.headerLogo).toHaveAttribute('alt', 'Betsafe by Betsson')
})

When(/^User selects "([^"]*)" from the language dropdown$/, async(languageCode) => {
    await PageNavigation.selectLanguage(languageCode);
})

Then(/^User can see page content translated in selected language "([^"]*)"$/, async(languageCode) => {
    await PageObject.assertTranslations(languageCode);
})