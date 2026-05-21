const {test,expect} = require('@playwright/test');
//Change made at 18:25 on May21
test ('@e2e Validating first product', async ({browser})=> {
let productName = "ZARA COAT 3";
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

const username = page.locator('#userEmail');
const password = page.locator('#userPassword');
const cardBody = await page.locator('.card-body').all();
await username.fill("anshika@gmail.com");
await password.fill("Iamking@000");
await page.locator('[name="login"]').click();
//const allProducts = await cardBody.locator('b').allTextContents(); 
await page.pause();

//Select a product and add to cart. 
// Product name will be dynamically given through our test file
for (const product of cardBody){
    await product.locator('b').textContent().toContain(productName);
    await product.locator('text= Add to cart').click();
    console.log("Product added to cart",(await product.locator('b').textContent()));
    break;
}
// validate the cart page whether the same item is added to cart or not.
await page.locator('[routerlink="/dashboard/cart"]').click();
const itemBlock = await page.locator('.items.even');
const itemName = await itemBlock.locator('h3').textContent();
expect(itemName).toBe(productName);

// Then Checkout >> Validate the product name >> Validate same quantity >> Enter credit card details, Country 
// >>Apply coupon 'rahulshettyacademy' >> Confirmation page >> Validate the text "Thanks for confirming"
// Capture the Order ID >> Go to Orders history page >> Check if our Order is present >>
// click and validate all other details of the order is correct or not

});