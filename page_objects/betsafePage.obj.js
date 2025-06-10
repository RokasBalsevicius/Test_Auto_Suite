const { visibilityChecker, browserLoader } = require('../utils/helpers.js');


const translations = {
    EN: {
        loginBtn: 'Login',
        registerBtn: 'Register'
    },
    LT: {
        loginBtn: 'Prisijungti',
        registerBtn: 'Registracija'
    },
    RU: {
        loginBtn: 'Логин',
        registerBtn: 'Регистрация'
    }
}

class PageObject {

    get headerLogo() {
        return $('.nav-header__logo img')
    }

    get headerLanguageBtn() {
        return $('.language')
    }

    get loginBtn() {
        return $('.btn.btn-tertiary')
    }

    get registrationBtn() {
        return $('.btn.btn-secondary')
    }

    get loginInputField() {
        return $('#username')
    }

    get passwordInputField() {
        return $('#password')
    }

    async getLanguageElement(languageCode) {
        let lowerCaseLanguageCode = languageCode.toLowerCase()
        return $(`//span[@class='language__item-iso' and text()='${lowerCaseLanguageCode}']`)
    }

    async openPage() {
        await browser.url('https://www.betsafe.lt/lt');
        await browserLoader();
    }

    async assertTranslations(languageCode) {
        const lang = languageCode.toUpperCase();
        const expectedTranslations = translations[lang];
        if (!expectedTranslations) {
            throw new Error(`Unsupported language code: ${languageCode}`);
        }
        for(const [key, expectedTranslation] of Object.entries(expectedTranslations)) {
            const element = await this[key];
            if (!element) {
                console.warn(`Element for key '${key}' not found`);
                continue;
            }
            const elementText = await element.getText();
            const normalizedElementText = elementText.toUpperCase();
            const normalizedExpectedText = expectedTranslation.toUpperCase();

            await expect(normalizedElementText).toContain(normalizedExpectedText)
        }
    }

    async loginAction(username, password) {
        const inputFields = [this.loginInputField, this.passwordInputField];
        for(const field of inputFields){
            await visibilityChecker(field);
        }
        await this.loginInputField.setValue(username);
        await this.passwordInputField.setValue(password);

        await visibilityChecker(this.loginBtn);
        await this.loginBtn.click();
    }
}

module.exports = new PageObject();
