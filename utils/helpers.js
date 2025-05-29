async function modalCloser(modalSelector, modalCloseButton) {
    try {
        const modal = await $(modalSelector);
        await modal.waitForDisplayed({timeout: 5000});

        if(await modal.isDisplayed()){
            const closeButton = await $(modalCloseButton);
            expect(await closeButton.isDisplayed()).toBe(true);
            await closeButton.click();
        } 
    } catch {
        console.log(`Modal is not visible: ${modalSelector}, proceeding further without closing`)
    }
}

module.exports = {
    modalCloser
}