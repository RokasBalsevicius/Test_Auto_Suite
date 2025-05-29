const { Before } = require('@wdio/cucumber-framework');
const { modalCloser } = require('../utils/helpers.js')

//Before hook to start at the cart page with already added item
Before({tags: '@needs-item-in-cart'}, async() => {
    console.log('Before hook runs') 
    await browser.url('https://www.topocentras.lt/kompiuteriai-ir-plansetes/nesiojamieji-kompiuteriai.html');
    await modalCloser('.CybotCookiebotDialogContentWrapper', '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');

    const productGrid = await $('.ProductGrid-catalogProductGrid-3ct');
    await productGrid.waitForDisplayed({timeout: 10000});
    await productGrid.scrollIntoView();
    await browser.pause(3000);

    const firstItem = await $('.ProductGridItem-productWrapper-2ip');
    await firstItem.waitForDisplayed({timeout: 2000});
    expect(await firstItem.isDisplayed()).toBe(true);

    const addToCartButton = await firstItem.$('[data-test-id="add-to-cart-btn"]');
    expect(await addToCartButton.isDisplayed()).toBe(true);
    await addToCartButton.click();

    try {
        await modalCloser('.AddToCartModal-modal-yzF', '[data-test-id="add-to-cart-modal-continue-btn"]');
    } catch (e) {
        console.warn('Modal failed to close, but continuing...');
    }

    const cartBtn = await $('.Cart-cartContainer-1zC')
    await cartBtn.scrollIntoView();
    expect(await cartBtn.isDisplayed()).toBe(true);
    await cartBtn.click();

    const itemInCartPage = await $('.Products-nameContainer-TG5');
    await itemInCartPage.waitForDisplayed({timeout: 3000})
    expect(await itemInCartPage.isDisplayed()).toBe(true);

    await browser.waitUntil(
        async () => (await browser.getTitle()).includes('Krepšelis'),
        {
            timeout: 5000,
            timeoutMsg: 'Cart page title did not load in time',
        }
    );
})