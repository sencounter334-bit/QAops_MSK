const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require ('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const path = require('path');


Before( async function ()
{
    const browser = await playwright.chromium.launch({headless: true});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

// AfterStep( async function (stepInfo) {
//     const result = stepInfo?.result || stepInfo;
//     //console.log("AfterStep hook triggered", result);
//     const ssPath = path.join(__dirname, '..', 'screenshots', `SS_${Date.now()}.png`);
//     if (result?.status === Status.FAILED) {
//         console.log("Step failed, taking screenshot");
//         await this.page.screenshot({path: ssPath});
//     }
// });
After( async function () {
    console.log("After hooks:: Use me to tear down test data.");
});