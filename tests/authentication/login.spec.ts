import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { InventoryPage } from '../../pages/inventory-page';
import applicationUsers from '../../data/application-users.json';
import syntheticUsers from '../../data/synthetic-users.json';

test('CT-001: Realizar login com sucesso', {
  tag: ['@Authentication', '@Positive'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  await loginPage.navigate();
  await loginPage.login(
    applicationUsers.standardUser.username, 
    applicationUsers.standardUser.password);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(inventoryPage.inventoryContainer).toBeVisible();
});

test('CT-002: Realizar login com senha incorreta', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(
    applicationUsers.standardUser.username, 
    syntheticUsers.invalidPassword.password);
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service',
  );
});

test('CT-003: Realizar login com usuário inexistente', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(
    syntheticUsers.nonexistentUser.username, 
    applicationUsers.standardUser.password);
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
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username is required');
});

test('CT-005: Realizar login com usuário vazio', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('', applicationUsers.standardUser.password);
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username is required');
});

test('CT-006: Realizar login com senha vazia', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(applicationUsers.standardUser.username, '');
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Password is required');
});

test('CT-007: Realizar login com usuário bloqueado', {
  tag: ['@Authentication', '@Negative'],
}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(
    applicationUsers.lockedOutUser.username, 
    applicationUsers.lockedOutUser.password);
  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.',
  );
});
