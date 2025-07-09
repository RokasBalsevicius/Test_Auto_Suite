const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(/^User start at Cart page with already added item$/, async () => {
    await expect(browser).toHaveTitleContaining("Krepšelis");
});

When(/^User selects insurance plan$/, async() => {
    const insurancePlan = await $('.ServiceCard-selectControl-1_9');
    //switches to Selenium instead of Chromedriver - thus tests are running faster causing some elements to not be ready before action. Need refactoring.    
    await browser.pause(3000);
    expect(await insurancePlan.isDisplayed()).toBe(true);

    await insurancePlan.click();

    const dropdownTable = await $('.ServiceCard-selectMenu-1nW');
    //switches to Selenium instead of Chromedriver - thus tests are running faster causing some elements to not be ready before action. Need refactoring.
    await browser.pause(3000);
    expect(await dropdownTable.isDisplayed()).toBe(true)

    /*Due to "focus" on a dropdown list, unable to catch attributes for available selections, thus all options are rendered into 
    array. currently array contains 6 classes, however only indexes 1, 2, 4 and 5 are clickable, and indexes 0 and 3 are placeholders*/
    const options = await $$('.CustomSelectComponents-optionLabel-2e1');

    const wishedSelection = options[2]
    await wishedSelection.click();

    const loadingSpinner = await $('.LoaderComponent-loader-CWG');
    await loadingSpinner.waitForDisplayed({ timeout: 3000 });
    await loadingSpinner.waitForDisplayed({ reverse: true, timeout: 10000 });
})

Then(/^Additional insurance plan price displayed in price calculation$/, async() => {
    const priceElement = await $('div.CustomSelectComponents-optionLabel-2e1 span');
    let rawText = await priceElement.getText();//<--start render price of selected insurance plan
    rawText = rawText.replace(/\s|€/g, '').replace(',', '.');
    const selectedPrice = parseFloat(rawText);

    const priceCalculation = await $$('div.TotalSegment-value-3ky span');
    let foundMatch = false; //<--Setting starting value so an assertion could be done at the end.

    for(const calcPrice of priceCalculation) {
        let calcText = await calcPrice.getText();//<--start render price of selected services in total calculation with loop, as total price wrapper shares same classes.
        calcText = calcText.replace(/\s|€/g, '').replace(',', '.');
        const calculatedPrice = parseFloat(calcText);
        if(selectedPrice === calculatedPrice){
            console.log('Amounts are matching...')
            foundMatch = true;
            break;
        }
    }
    expect(foundMatch).toBe(true)
})