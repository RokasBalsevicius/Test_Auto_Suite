async function cookieModalCloser(cookieModalSelector, cookieModalBtn){
    const cookieModal = await $(cookieModalSelector);
    await cookieModal.waitForDisplayed({timeout: 5000});
    expect(await cookieModal.isDisplayed()).toBe(true);

    const modalCloseBtn = await $(cookieModalBtn);
    await modalCloseBtn.waitForDisplayed({timeout: 5000})
    expect(await modalCloseBtn.isDisplayed()).toBe(true);

    await modalCloseBtn.click();
}

module.exports = {
    cookieModalCloser
}