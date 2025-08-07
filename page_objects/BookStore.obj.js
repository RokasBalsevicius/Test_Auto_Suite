const { browserLoader } = require('../utils/helpers.js');

class PageObject {

    get firstnameInputField() {
        return $('#firstname');
    }

    get lastnameInputField() {
        return $('#lastname');
    }

    get usernameInputField() {
        return $('#userName');
    }

    get passwordInputField() {
        return $('#password')
    }

    get recapthaIframe() {
        return $('iframe[title="reCAPTCHA"]')
    }

    get imNotRobotCheckbox() {
        return $('.recaptcha-checkbox');
    }

    get imNotRobotChecked() {
        return $('.recaptcha-checkbox-checked')
    }

    get registerBtn() {
        return $('#register');
    }

    get gotologinBtn() {
        return $('#gotologin');
    }

    get loginBtn() {
        return $('#login');
    }

    get loggedInNameTag() {
        return $('#userName-value');
    }
    //created a random username generator to reuse in Registration method.
    async usernameGenerator(username = 'AutoTest') {
        const randomNum = Math.floor(Math.random() * 10000);
        const timestamp = Date.now().toString().slice(-4);
        return `${username}${randomNum}${timestamp}`
    }

    async openPage(slug) {
        await browser.url('https://demoqa.com/' + slug);
        await browser.execute(() => {
            document.body.style.zoom = '80%';
        });
        await browserLoader();
    }

    async fillRegistrationForm({
        firstname = "Tester", 
        lastname = 'Testing', 
        password = "Password123!"
    } = {}) {
        this.generatedUsername = await this.usernameGenerator(); //creating a generatedUsername property upon use of this method, so that it could be used in login method later.
        await this.firstnameInputField.setValue(firstname);
        await this.lastnameInputField.setValue(lastname);
        await this.usernameInputField.setValue(this.generatedUsername);
        await this.passwordInputField.setValue(password);
        try {
            await browser.switchToFrame(await this.recapthaIframe);
            await this.imNotRobotCheckbox.click();
            await this.imNotRobotChecked.waitForDisplayed({
                timeout: 10000, 
                timeoutMsg: "reCAPTHA check-box is still not checked after 10 seconds" 
            });
        } catch(err) {
            throw new Error(`Failed to mark reCAPTHA checkbox: ${err.message}`);
        }
        await browser.switchToParentFrame();
        await this.registerBtn.click();
    }

    async fillLoginForm() {
        await this.usernameInputField.setValue(this.generatedUsername);
        await this.passwordInputField.setValue('Password123!');
        await this.loginBtn.click();
    }
}

module.exports = new PageObject();
