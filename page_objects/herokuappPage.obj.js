const { browserLoader } = require('../utils/helpers.js');
const path = require('path');

class PageObject {

    get fileInputBtn() {
        return $('#file-upload');
    }

    get uploadBtn() {
        return $('#file-submit');
    }

    get uploadConfirmationMsg() {
        return $('#uploaded-files');
    }

    get uploadConfirmationExpectedMsg() {
        return 'sampleFile.pdf';
    }

    get filePath() {
        return path.join(__dirname, '../test_files/sampleFile.pdf');
    }

    async selectFileToUpload() {
        console.log(this.filePath);
        await this.fileInputBtn.waitForDisplayed({timeout: 5000});
        await this.fileInputBtn.setValue(this.filePath);
        await this.uploadBtn.waitForDisplayed({timeout: 5000});
        await this.uploadBtn.click();
        await browserLoader();
    }

    async openPage(slug) {
        await browser.url('https://the-internet.herokuapp.com' + slug);
        await browserLoader();

    }
}
module.exports = new PageObject();