
import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';
import applicationUsers from '../../data/application-users.json';

test('CT-008: Realizar logout com sucesso', {
  tag: ['@Authentication', '@Positive'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login(
    applicationUsers.standardUser.username, 
    applicationUsers.standardUser.password);
  await expect(inventoryPage.inventoryContainer).toBeVisible();
  await inventoryPage.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(loginPage.loginContainer).toBeVisible();
});

test('CT-009: Acessar catálogo de produtos sem estar autenticado', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.navigate();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByRole('alert')).toHaveText(
    "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  );
});

test('CT-010: Acessar catálogo de produtos após logout pelo botão Voltar do navegador', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login(
    applicationUsers.standardUser.username, 
    applicationUsers.standardUser.password);
  await expect(inventoryPage.inventoryContainer).toBeVisible();
  await inventoryPage.logout();
  await inventoryPage.goBack();
  await expect(page.getByRole('alert')).toHaveText(
    "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  );
});

test('CT-011: Acessar catálogo de produtos após logout por URL direta', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login(
    applicationUsers.standardUser.username, 
    applicationUsers.standardUser.password);
  await expect(inventoryPage.inventoryContainer).toBeVisible();
  await inventoryPage.logout();
  await inventoryPage.navigate();
  await expect(page.getByRole('alert')).toHaveText(
    "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  );
});
