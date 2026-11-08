
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';

test('CT-001: Realizar login com sucesso', {
  tag: ['@Authentication', '@Positive'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(inventoryPage.inventoryContainer).toBeVisible();
});

test('CT-002: Realizar login com senha incorreta', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', 'invalid_password');
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('CT-003: Realizar login com usuário inexistente', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('invalid_user', 'secret_sauce');
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('CT-004: Realizar login com usuário e senha vazios', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('', '');
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
});

test('CT-005: Realizar login com usuário vazio', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('', 'secret_sauce');
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
});

test('CT-006: Realizar login com senha vazia', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('standard_user', '');
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
});

test('CT-007: Realizar login com usuário bloqueado', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});
