const {test,expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test ('@smoke Browser context test', async ({browser})=> {
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
console.log(await page.title());
const userName = page.locator('#username')
const signButton = page.locator('#signInBtn')
await userName.fill("rahulshetty");
await page.locator('input[type="password"]').fill("Learning@830$3mK2");
await signButton.click();
const errorText = await page.locator("div[style*='block']").textContent();
console.log(errorText);
await expect (errorText).toContain("Incorrect");
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signButton.click();
//After logged in, grab the title of the first product

const cardTitle = page.locator(".card-title a");
console.log(await cardTitle.first().textContent());
console.log(await cardTitle.nth(1).textContent()); //gets 1st index which is the 2nd element
console.log("------------------")
//To get all titles in a single variable that stores an array
const allTitles = await cardTitle.allTextContents();
console.log(allTitles);
});


test ('Page fixture test', async ({page})=> {
await page.goto("https://gemini.google.com/");
await expect(page).toHaveTitle("Google Gemini");
});


test ('UI Controls',async({page})=>{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
const userName = page.locator('#username');
const password = page.locator('#password');
const signButton = page.locator('#signInBtn');
const dropdown = page.locator('select.form-control');
const blinkingText = page.locator('a[href="https://techsmarthire.com/"]');
await dropdown.selectOption("teach");
await page.locator('.checkmark').nth(1).click();
await page.locator('#okayBtn').click(); //web based popup - direct click will work unlike a java based popup
await page.pause();
// assertion to check radio button is checked
await expect(page.locator('.checkmark').nth(1)).toBeChecked();
//another method to check: ".isChecked". Returns true or false. Can assert using .truthy or .toBeTruthy
await page.locator('#terms').check(); // This is a checkbox
await expect(page.locator('#terms')).toBeChecked();
await page.locator('#terms').uncheck();
//await expect(page.locator('#terms')).not.toBeChecked();
expect(await page.locator('#terms').isChecked()).toBeFalsy();
//Wants to find if the text at top is blinking or not. Can validate by checking if there is a HTML Class called 'Blinking text' in attributes
//Validate whether attribute has a specific value
await expect(blinkingText).toHaveAttribute("class","blinkingText");

});

test('Child Window Handling', async ({browser})=> {
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName = page.locator('#username');
const blinkingText = page.locator('a[href="https://rahulshettyacademy.com/documents-request"]');
//a[href="https://rahulshettyacademy.com/documents-request"]
const [page2] = await Promise.all( //This is used to handle multiple promises at the same time. We have to tell playwright that we are going to do some action which will trigger a new page to open and we want to wait for that page to open and then switch control to that page
[
context.waitForEvent('page'),//This is a listener which listens for a new page to open
blinkingText.click(),
])//before clicking we have to tell playwright that this might open a new page
//Now a new page is opened in browser, need to switch control to that page
//3 states of Promises: Promise pending, fulfilled and rejected. When we click on the blinking text, it will trigger the promise to resolve and give us the new page object
const text1 = await page2.locator('p.red').textContent();
console.log(text1);
const text2 = text1.split("@")[1] // The whole text is split into 2 parts using @ as a separator and we want the 2nd part which is the email address
const textEmail = text2.split(" ")[0] // The email address is further split into 2 parts using space as a separator and we want the 1st part which is the email address without any extra spaces
console.log(textEmail);
await userName.fill(textEmail);
//trying to grab the text typed --> use method valueInput(). .textcontent() wont work here
console.log(await page.locator('#username').inputValue());
});