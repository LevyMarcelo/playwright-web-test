import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly sortSelect: Locator;
  readonly shoppingCartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  async navigate() {
    await this.page.goto('/inventory.html');
  }

  async goBack() {
    await this.page.goBack();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
