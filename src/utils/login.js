import { LoginPage } from '../pageObjects/pages.js';

/**
 * 
 * @param {import('@playwright/test').Page} page
 * @param {Object} user 
 * @param {string} baseUrl 
 */
export async function login(page, user, baseUrl) {
  const loginPage = new LoginPage(page);
  await loginPage.goto(baseUrl);
  await loginPage.login(user.username, user.password);
}