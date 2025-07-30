const { Given, When, Then } = require('@wdio/cucumber-framework');
const PageObject = require('../../page_objects/DemoQA.obj.js');


Given(/^User starts at the page to test hovering and ToolTips$/, async() => {
    await PageObject.openPage('tool-tips');
})

When(/^User hovers on "Hover me to see" button$/, async() => {
    const isVisible = await PageObject.hoverMeToSeeBtn.isDisplayed();
    if(!isVisible) {
        await PageObject.hoverMeToSeeBtn.scrollIntoView();
    }
    await PageObject.hoverMeToSeeBtn.moveTo();
    await browser.pause(1000);
})

Then(/^User can see a ToolTip for hovered button with text inside$/, async() => {
    const expectedTexts = await PageObject.expectedToolTipTexts;
    await PageObject.hoverToolTipCheck(PageObject.hoverMeToSeeBtn, PageObject.toolTipTextSelector, expectedTexts)
})

When(/^User hovers on "Contrary" hypertext$/, async() => {
    const isVisible = await PageObject.contraryToolTip.isDisplayed();
    if(!isVisible) {
        await PageObject.contraryToolTip.scrollIntoView();
    }
    await PageObject.contraryToolTip.moveTo();
    await browser.pause(1000);
})

Then(/^User can see a ToolTip for hovered hypertext "Contrary" with text inside$/, async() => {
    const expectedTexts = await PageObject.expectedToolTipTexts;
    await PageObject.hoverToolTipCheck(PageObject.contraryToolTip, PageObject.toolTipTextSelector, expectedTexts)
})

When(/^User hovers on "1.10.32" hypertext$/, async() => {
    const isVisible = await PageObject.sectionToolTip.isDisplayed();
    if(!isVisible) {
        await PageObject.sectionToolTip.scrollIntoView();
    }
    await PageObject.sectionToolTip.moveTo();
    await browser.pause(1000);
})

Then(/^User can see a ToolTip for hovered hypertext "1.10.32" with text inside$/, async() => {
    const expectedTexts = await PageObject.expectedToolTipTexts;
    await PageObject.hoverToolTipCheck(PageObject.sectionToolTip, PageObject.toolTipTextSelector, expectedTexts)
})
