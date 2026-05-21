const playwright = require('@playwright/test');
const expect = require('@playwright/test').expect;
const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');


Given('Login to ecomm app with {string} and {string}', { timeout: 20 * 1000 }, async function (username, password) {

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add product to cart {string}', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Placed order with valid details', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order in Order History page', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('Enter incorrect credentials in Ecomm2 app {string}, {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = this.page.locator('#username');
    this.signButton = this.page.locator('#signInBtn');
    await userName.fill(username);
    await this.page.locator('input[type="password"]').fill(password);

});
Then('Error message should be displayed', async function () {
    await this.signButton.click();
    const errorText = await this.page.locator("div[style*='block']").textContent();
    await expect(errorText).toContain("Incorrect");
});