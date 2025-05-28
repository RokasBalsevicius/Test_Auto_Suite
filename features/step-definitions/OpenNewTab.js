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
    const isVisible = await contentTitle.isDisplayed().catch((err) => {
        console.log(`contentTitle is not visible: ${err}`);
        return false;
    })
    expect(isVisible).toBe(true);
    await expect(contentTitle).toHaveTextContaining('Mokėjimo būdai')
})