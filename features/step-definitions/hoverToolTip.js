const { Given, When, Then } = require('@wdio/cucumber-framework');
const PageObject = require('../../page_objects/DemoQA.obj.js');


Given(/^User starts at the page to test hovering and ToolTips$/, async() => {
    await PageObject.openPage('tool-tips');
})


When(/^User hovers on "Hover me to see" button$/, async() => {
    await PageObject.mouseMover(PageObject.hoverMeToSeeBtn);
    await PageObject.waitForAriaDescribedBy(PageObject.hoverMeToSeeBtn, PageObject.hoverMeToSeeBtnAriaValue);
})

Then(/^User can see a ToolTip for hovered button with text inside$/, async() => {
    const expectedTexts = await PageObject.expectedToolTipTexts;
    await PageObject.hoverToolTipCheck(PageObject.hoverMeToSeeBtn, PageObject.toolTipTextSelector, expectedTexts)
})


When(/^User hovers on "Contrary" hypertext$/, async() => {
    await PageObject.mouseMover(PageObject.contraryToolTip);
    await PageObject.waitForAriaDescribedBy(PageObject.contraryToolTip, PageObject.contraryToolTipAriaValue);
})

Then(/^User can see a ToolTip for hovered hypertext "Contrary" with text inside$/, async() => {
    const expectedTexts = await PageObject.expectedToolTipTexts;
    await PageObject.hoverToolTipCheck(PageObject.contraryToolTip, PageObject.toolTipTextSelector, expectedTexts)
})


When(/^User hovers on "1.10.32" hypertext$/, async() => {
    await PageObject.mouseMover(PageObject.sectionToolTip);
    await PageObject.waitForAriaDescribedBy(PageObject.sectionToolTip, PageObject.sectionToolTipAriaValue);
})

Then(/^User can see a ToolTip for hovered hypertext "1.10.32" with text inside$/, async() => {
    const expectedTexts = await PageObject.expectedToolTipTexts;
    await PageObject.hoverToolTipCheck(PageObject.sectionToolTip, PageObject.toolTipTextSelector, expectedTexts)
})
