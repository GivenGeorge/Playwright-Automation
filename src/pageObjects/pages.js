import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = '#user-name';
    this.passwordField = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  async expectErrorVisible(message) {
    await expect(this.page.locator(this.errorMessage)).toContainText(new RegExp(message, 'i'));
  }
}

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = '.shopping_cart_link';
  }

  async addItemToCartByName(itemName) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button.btn_inventory').click();
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }

  async expectAllItemsVisible(items) {
    for (const item of items) {
      await expect(this.page.locator('.inventory_item_name', { hasText: item.name })).toBeVisible();
    }
  }
}

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = '[data-test="checkout"]';
    this.cartItems = '.cart_item';
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async expectCartItemCount(count) {
    await expect(this.page.locator(this.cartItems)).toHaveCount(count);
  }
}

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.zipCodeInput = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.finishButton = '[data-test="finish"]';
  }

  async enterCheckoutInfo(firstName, lastName, zipCode) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.zipCodeInput, zipCode);
    await this.page.click(this.continueButton);
  }

  async finishCheckout() {
    await this.page.click(this.finishButton);
  }
}

class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = '.complete-header';
  }

  async assertOrderComplete() {
    await expect(this.page.locator(this.completeHeader)).toHaveText(/thank you for your order/i);
  }
}

export const Pages = {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
  CheckoutCompletePage
};
