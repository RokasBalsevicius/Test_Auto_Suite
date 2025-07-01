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
        return $('.logo')
    }

    get headerLanguageBtn() {
        return $('.StyledLanguageBtnWrp-sc-7oyh7y')
    }

    get loginBtn() {
        return $("div[class='StyledUserNav-sc-1o2gfvp hqRnYp collapse'] button[type='submit']")
    }

    get registrationBtn() {
        return $("div[class='StyledUserNav-sc-1o2gfvp hqRnYp collapse'] button[type='button']")
    }

    get loginInputField() {
        return $('#username')
    }

    get passwordInputField() {
        return $('#password')
    }

    async getLanguageElement(languageCode) {
        const lowerCaseLanguageCode = languageCode.toLowerCase()
        return $(`//span[normalize-space()='${lowerCaseLanguageCode}']`)
    }

    async openPage() {
        await browser.url('https://www.betsson.lt/lt');
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
