const PageObject = require('../page_objects/betssonPage.obj.js');
const { browserLoader } = require('../utils/helpers.js');

class PageNavigation {

    async selectLanguage(languageCode) {
        await PageObject.headerLanguageBtn.click();
        const langElement = await PageObject.getLanguageElement(languageCode);

        try {
            await langElement.click();
        } catch (error) {
            console.warn(`Normal click failed, attempting JS click...Error: ${error}`);
            await browser.execute(el => el.click(), await langElement)
            /*All language elements share same class, therefore getLanguageElement method selects element via XPath.
            Returned element appears to be not interactable. Therefore normal .click() does not work. Used
            browser.execute() to force click on the element, however in future it should be refactored to work with simple .click()*/

        }
        await browser.pause(2000);
        await browserLoader();

    }
}

module.exports = new PageNavigation();