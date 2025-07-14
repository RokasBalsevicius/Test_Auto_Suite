const {Given, When, Then} = require('@wdio/cucumber-framework');
const PageObject = require('../../page_objects/topocentrasPage.obj.js');
const { modalCloser, visibilityChecker } = require('../../utils/helpers.js');


When(/^User clicks on "Mokėjimo būdai" hyperlink at footer$/, async() => {
    const relativeUrl = await PageObject.paymentMethodsLink.getAttribute('href');
    const fullUrl = `https://www.topocentras.lt${relativeUrl}`;

    await browser.newWindow(fullUrl);

    await expect(browser).toHaveUrlContaining('/mokejimo-budai');
    await expect(browser).toHaveTitle('Mokėjimo būdai')
})

Then(/^User can see page content title "Mokėjimo būdai"$/, async() => {
    await visibilityChecker(PageObject.paymentMethodsWrapperTitle);
    await expect(PageObject.paymentMethodsWrapperTitle).toHaveTextContaining('Mokėjimo būdai')
})