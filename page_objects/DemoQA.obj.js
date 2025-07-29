const { browserLoader } = require('../utils/helpers.js');
const path = require('path');

class PageObject {

    get formFileUploadBtn() {
        return $('#uploadPicture');
    }

    get formSubmitBtn() {
        return $('#submit');
    }

    get nameField() {
        return $('#firstName');
    }

    get surnameField() {
        return $('#lastName');
    }

    get emailField() {
        return $('#userEmail');
    }

    get phoneNumberField() {
        return $('#userNumber');
    }

    get dateOfBirthField() {
        return $('#dateOfBirthInput');
    }

    get subjectContainerField() {
        return $('#subjectsContainer');
    }

    async genderRadioBtns() {
        return [
            await $('label[for="gender-radio-1"]'),
            await $('label[for="gender-radio-2"]'),
            await $('label[for="gender-radio-3"]')
        ]
    }

    async hobbiesRadioBtns() {
        return [
            await $('label[for="hobbies-checkbox-1"]'),
            await $('label[for="hobbies-checkbox-2"]'),
            await $('label[for="hobbies-checkbox-3"]')
        ]
    }

    get addressInputField() {
        return $('#currentAddress');
    }

    get stateField() {
        return $('#state');
    }

    get stateOption() {
        return $('#react-select-3-option-0');
    }
    
    get cityField() {
        return $('#city');
    }

    get cityOption() {
        return $('#react-select-4-option-0');
    }

    get formSubmitConfirmation() {
        return $('.modal-title.h4');
    }

    get submittedFormModal() {
        return $('.modal-content');
    }

    get confirmationModalCloseBtn() {
        return $('#closeLargeModal');
    }

    async randomRadioBtnSelector(buttons) {
        const randomIndex = Math.floor(Math.random() * buttons.length);
        return buttons[randomIndex];
    }

    get filePath() {
        return path.join(__dirname, '../test_files/sampleFile.pdf');
    }

    async openPage(slug) {
        await browser.url('https://demoqa.com/' + slug);
        await browserLoader();

    }

    async requiredElements({genderIndex = 1, hobbyIndex = 0} = {}) {
        const genderBtns = await this.genderRadioBtns();
        const hobbyBtns = await this.hobbiesRadioBtns();
        const requiredElements = [
            this.nameField, 
            this.surnameField, 
            this.emailField, 
            this.formFileUploadBtn,
            this.phoneNumberField, 
            this.dateOfBirthField, 
            this.subjectContainerField, 
            genderBtns[genderIndex],
            hobbyBtns[hobbyIndex],
            this.addressInputField, 
            this.stateField, 
            this.cityField
        ]
        return requiredElements;
    }
}
module.exports = new PageObject();