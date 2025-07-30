const { browserLoader, visibilityChecker } = require('../utils/helpers.js');
const path = require('path');

class PageObject {

    get contraryToolTip() {
        return $(`div[class='col-12 mt-4 col-md-6'] a:nth-child(1)`);
    }

    get sectionToolTip() {
        return $(`//a[normalize-space()='1.10.32']`);
    }

    get hoverMeToSeeBtn() {
        return $('#toolTipButton');
    }

    get toolTipTextSelector() {
        return $('.tooltip-inner');
    }

    get expectedToolTipTexts() {
        return [
            'You hovered over the Button',
            'You hovered over the Contrary',
            'You hovered over the 1.10.32'
        ]
    }

    async hoverToolTipCheck(toolTip, toolTipTextElement, expectedTexts) {
        await visibilityChecker(toolTip);
        const toolTipText = await toolTipTextElement.getText();
        expect(expectedTexts.some(text => toolTipText.includes(text))).toBe(true);
        console.log(`received text: ${toolTipText}`);
    }

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
        await browser.setWindowSize(1500, 800);
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

    async checkRequiredElementsVisibility() {
        const elements = await this.requiredElements({genderIndex: 1, hobbyIndex: 0});
        for(const el of elements) {
            await el.scrollIntoView();
            console.warn(`Currently checking visibility of element: ${el.selector}`);
            await visibilityChecker(el);
        }
    }

    async fillForm({
        firstname = 'Test',
        lastname = 'Tester',
        email = 'tester123@mail.com',
        genderIndex = 1,
        hobbyIndex = 0,
        phone = '3701234567',
        dob = '30 Jul 2000',
        subject = 'Maths',
        address = 'Test street 123.',
        //state = this.stateOption, -> if further needed, this could be adjusted by changing stateOption getter to a function with an argument passed for other options for more dynamic selector
        //city = this.cityOption, -> if further needed, this could be adjusted by changing stateOption getter to a function with an argument passed for other options for more dynamic selector
        filePath = this.filePath
    } = {}) {
        const genderBtns = await this.genderRadioBtns();
        const hobbyBtns = await this.hobbiesRadioBtns();
        await this.nameField.setValue(firstname);
        await this.surnameField.setValue(lastname)
        await this.emailField.setValue(email);
        await genderBtns[genderIndex].click();
        await this.phoneNumberField.setValue(phone);
        await this.dateOfBirthField.setValue(dob);
        await this.subjectContainerField.setValue(subject);
        await browser.keys('Enter');
        await hobbyBtns[hobbyIndex].click();
        await this.formFileUploadBtn.setValue(filePath);
        await this.addressInputField.setValue(address);
        await this.stateField.click();
        await this.stateOption.click();
        await this.cityField.click();
        await this.cityOption.click();
        await this.formSubmitBtn.click();
    }
}

module.exports = new PageObject();