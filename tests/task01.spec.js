const {test,expect} = require('@playwright/test');

test ('@basic Validating first product', async ({browser})=> {
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

const username = page.locator('#userEmail');
const password = page.locator('#userPassword');
const cardBody = page.locator('.card-body b');
await username.fill("anshika@gmail.com");
await password.fill("Iamking@000");
await page.locator('[name="login"]').click();

//console.log(await cardBody.first().textContent());
//To handle wait for next step - trying out network loaded wait. Waits till all APIs are active in the page
// await page.waitForLoadState('networkidle'); --> This is now discouraged by Playwright.
await cardBody.first().waitFor();
const allProducts = await cardBody.allTextContents(); //This alone might not work as this method has n9o auto wait. There might be slight delay in loading all titles causing to return no value
console.log(allProducts);
});