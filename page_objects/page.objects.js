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

    async openPage(path = '') {
        await browser.url(`${path}`)
    }
}

module.exports = new PageObject();
