const { Before } = require('@wdio/cucumber-framework');
const { modalCloser, visibilityChecker } = require('../utils/helpers.js');
const PageObject = require('../page_objects/page.objects.js');

//Before hook to start at the cart page with already added item
Before({tags: '@needs-item-in-cart'}, async() => {
    console.log('Before hook runs');
    await PageObject.openPage('/kompiuteriai-ir-plansetes/nesiojamieji-kompiuteriai.html');
    await modalCloser(PageObject.cookieModalWrapper, PageObject.cookieModalCloseBtn);

    await visibilityChecker(PageObject.laptopProductGrid);
    await PageObject.laptopProductGrid.scrollIntoView();
    await browser.pause(3000);

    await visibilityChecker(PageObject.laptopProductFirstItem);

    await visibilityChecker(PageObject.productGridAddToCartBtn);
    await PageObject.productGridAddToCartBtn.click();

    try{
        await modalCloser(PageObject.cartModalWrapper, PageObject.cartModalContinueBtn);
    } catch(err) {
        throw new Error(`Error: ${err.message}. Modal failed to close, but continuing...`)
    }

    await visibilityChecker(PageObject.headerCartBtn);
    await PageObject.headerCartBtn.scrollIntoView();
    await PageObject.headerCartBtn.click();

    await visibilityChecker(PageObject.itemContainerCartPage)

    await browser.waitUntil(
        async () => (await browser.getTitle()).includes('Krepšelis'),
        {
            timeout: 5000,
            timeoutMsg: 'Cart page title did not load in time',
        }
    );
})