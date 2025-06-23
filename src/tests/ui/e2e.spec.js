import { test, expect } from '@playwright/test';
import { Pages } from '../../pageObjects/pages.js';
import testData from '../../data/testData.json' assert { type: 'json' };

test.describe('SauceDemo E2E', () => {
  test('Standard user purchase flow', async ({ page }, testInfo) => {
    const env = testInfo.project.use.envConfig;
    const { LoginPage, InventoryPage, CartPage, CheckoutPage, CheckoutCompletePage } = Pages;

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.goto(env.uiBaseUrl);
    await loginPage.login(env.users.standard_user.username, env.users.standard_user.password);
    await expect(page).toHaveURL(/inventory/);

    await inventoryPage.expectAllItemsVisible(testData.inventoryItems);
    await inventoryPage.addItemToCartByName(testData.inventoryItems[0].name);
    await inventoryPage.goToCart();

    await cartPage.expectCartItemCount(1);
    await cartPage.proceedToCheckout();

    const { firstname, lastname, zipcode } = testData.checkoutInfo;
    await checkoutPage.enterCheckoutInfo(firstname, lastname, zipcode);
    await checkoutPage.finishCheckout();

    await checkoutCompletePage.assertOrderComplete();
  });

  test('Locked out user sees error message', async ({ page }, testInfo) => {
    const env = testInfo.project.use.envConfig;
    const { LoginPage } = Pages;

    const loginPage = new LoginPage(page);
    await loginPage.goto(env.uiBaseUrl);
    await loginPage.login(env.users.locked_out_user.username, env.users.locked_out_user.password);
    await loginPage.expectErrorVisible('locked out');
  });
});
