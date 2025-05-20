const {Given, When, Then} = require('@wdio/cucumber-framework');

When(/^User clicks on "Mokėjimo būdai" hyperlink at footer$/, async() => {
    const newTabLink = await $('=Mokėjimo būdai');
    const relativeUrl = await newTabLink.getAttribute('href');
    const fullUrl = `https://www.topocentras.lt${relativeUrl}`;

    await browser.newWindow(fullUrl);

    await expect(browser).toHaveUrlContaining('/mokejimo-budai');
    await expect(browser).toHaveTitle('Mokėjimo būdai')
})

Then(/^User can see page content title "Mokėjimo būdai"$/, async() => {
    const contentTitle = await $('.CmsPage-title-vWx');
    await contentTitle.waitForDisplayed({timeout: 5000});

    expect(await contentTitle.isDisplayed()).toBe(true);
    if(!contentTitle.isDisplayed()) {
        console.log('Error: Mokejimo budai content title is not visible')
    }
    await expect(contentTitle).toHaveTextContaining('Mokėjimo būdai')
})