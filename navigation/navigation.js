const PageObject = require('../page_objects/betsafePage.obj.js');
const { visibilityChecker, browserLoader } = require('../utils/helpers.js');

class PageNavigation {

    async selectLanguage(languageCode) {
        const langElement = await PageObject.getLanguageElement(languageCode);
        await visibilityChecker(langElement);
        await langElement.click();
        await browserLoader()

    }
}

module.exports = new PageNavigation();