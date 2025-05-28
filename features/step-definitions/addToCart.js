const {Given, When, Then} = require('@wdio/cucumber-framework');

When(/^User navigates to "Kompiuterinė technika" categorie$/, async() => {
    const productCategory = await $('.DesktopMenu-tabItem-1Y-');
    await productCategory.waitForDisplayed({timeout: 5000});
    const productCategories = await $$('.DesktopMenu-tabItem-1Y-');

    for(const category of productCategories){
        const text = await category.getText();
        if(text.trim() === "Kompiuterinė technika"){
            await category.click();
            break;
        };
    }
})
Then(/^User can see list of sub-categories for "Kompiuterinė technika" category$/, async() => {
    const productSubCategories = await $('.category-view-row');
    await productSubCategories.waitForDisplayed({timeout: 10000});
    const subcategoriesList = await $$('.category-view-row');

    let visibileCount = 0;
    for(const subcategorie of subcategoriesList) {
        await subcategorie.scrollIntoView();
        if(await subcategorie.isDisplayed()){
            visibileCount++;
        }
    }
    expect(visibileCount).toBeGreaterThanOrEqual(1);

})   


When(/^When user clicks on "Nešiojami kompiuteriai"$/, async() => {
    const productCard = await $('#col1-1379');
    await productCard.waitForDisplayed({timeout: 5000});
    const isVisible = await productCard.isDisplayed().catch((err) => {
        console.log(`Error in product card display: ${err}`);
        return false;
    })
    expect(isVisible).toBe(true);
    await productCard.click()
});

Then(/^User is redirected and can see laptop products$/, async() => {
    const productGrid = await $('.ProductGrid-catalogProductGrid-3ct');
    await productGrid.waitForDisplayed({timeout: 5000});
    await productGrid.scrollIntoView();
    await browser.pause(3000)

     
    const isVisible = await productGrid.isDisplayed().catch((err) => {
        console.log(`Products grid is not visible: ${err}`)
        return false;
    })
    expect(isVisible).toBe(true);

    const productsList = await $$('.ProductGridItem-productWrapper-2ip');
    let visibleProducts = 0;
    for(const product of productsList) {
        await product.scrollIntoView();
        if(await product.isDisplayed()) {
            visibleProducts++;
        }
    }
    await expect(visibleProducts).toBeGreaterThanOrEqual(1);
})

When(/^User add the first item in product list to cart$/, async() => {
    const productList = await $$('.ProductGridItem-productWrapper-2ip');
    await expect(productList.length).toBeGreaterThanOrEqual(4)

    let checkedProductCount = 0;
    for(const product of productList) {
        expect(await product.isDisplayed()).toBe(true);
        checkedProductCount++;
        if(checkedProductCount >= 4) {
            break;
        }
    };

    const firstProduct = productList[0];
    const addToCartBtn = await firstProduct.$('[data-test-id="add-to-cart-btn"]');
    expect(await addToCartBtn.isDisplayed()).toBe(true)

    await addToCartBtn.click();
})

Then(/^Product is successfully added to cart and confirmation modal appears$/, async() => {
    const addedToCartModal = await $('.AddToCartModal-modal-yzF');
    await addedToCartModal.waitForDisplayed({timeout: 5000});
    expect(await addedToCartModal.isDisplayed()).toBe(true, 'Error: modal is not visible or failed to load in time');
})
