async function modalCloser(modalElement, closeButtonElement) {
    try {
        await modalElement.waitForDisplayed({timeout: 5000});

        if(await modalElement.isDisplayed()){
            await expect(closeButtonElement).toBeDisplayed()
            await closeButtonElement.click();
        } 
    } catch (err) {
        console.log(`Modal ${modalElement.selector} is not visible: ${err.message}. Proceeding further without closing`)
    }
}

async function visibilityChecker(element){
    try{
        await element.waitForDisplayed({timeout: 5000});
        await expect(element).toBeDisplayed()
    } catch (err) {
        throw new Error(`Selector ${element} is not visible: ${err.message}`)
    }
}

async function browserLoader() {
    await browser.waitUntil(
        async () => (await browser.execute(() => document.readyState)) === 'complete',
        {
          timeout: 10000,
          timeoutMsg: 'Page did not load completely in time',
        }
      );
}

module.exports = {
    modalCloser,
    visibilityChecker,
    browserLoader
}