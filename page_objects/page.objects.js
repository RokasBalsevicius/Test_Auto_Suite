const { visibilityChecker } = require('../utils/helpers.js');

class PageObject {

    get headerLoginBtn() {
        return $('[data-test-id="header-login-btn"]')
    }
    
    get loginInputField() {
        return $('[data-test-id="username"]')
    }
    
    get passwordInputField() {
        return $('[data-test-id="password"]')
    }
    
    get loginModal() {
        return $('.Modal-modal-1aA.LoginModal-loginModal-2X8')
    }

    get loginBtn() {
        return $('[data-test-id="login-btn"]')
    }

    get profileBtn() {
        return $('[data-test-id="my-account-link"]')
    }

    get logoutBtn() {
        return $('[data-test-id="header-logout-btn"]')
    }

    get mainPageCartBtn() {
        return $('.Cart-cartContainer-1zC')
    }

    get cookieModalWrapper() {
        return $('.CybotCookiebotDialogContentWrapper');
    }

    get cookieModalCloseBtn() {
        return $('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
    }

    get paymentMethodsWrapperTitle() {
        return $('.CmsPage-title-vWx')
    }

    get paymentMethodsLink() {
        return $('=Mokėjimo būdai')
    }

    get laptopProductGrid() {
        return $('.ProductGrid-catalogProductGrid-3ct')
    }

    get laptopProductFirstItem() {
        return $('.ProductGridItem-productWrapper-2ip')
    }

    get productGridAddToCartBtn() {
        return this.laptopProductFirstItem.$('[data-test-id="add-to-cart-btn"]')
    }

    get cartModalWrapper() {
        return $('.AddToCartModal-modal-yzF')
    }

    get cartModalContinueBtn() {
        return $('[data-test-id="add-to-cart-modal-continue-btn"]')
    }

    get headerCartBtn() {
        return $('.Cart-cartContainer-1zC')
    }

    get itemContainerCartPage() {
        return $('.Products-nameContainer-TG5')
    }

    async openPage(path = '') {
        await browser.url(`${path}`)
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
