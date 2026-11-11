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

  getProductCard(productName: string): Locator {
    return this.inventoryContainer.getByTestId('inventory-item').filter({
      has: this.page.getByText(productName, {
        exact: true,
      }),
    });
  }

  getProductName(productName: string): Locator {
    return this.getProductCard(productName).getByTestId('inventory-item-name');
  }

  getProductDescription(productName: string): Locator {
    return this.getProductCard(productName).getByTestId('inventory-item-desc');
  }

  getProductPrice(productName: string): Locator {
    return this.getProductCard(productName).getByTestId('inventory-item-price');
  }

  getProductImage(productName: string): Locator {
    return this.getProductCard(productName).getByRole('img', {
      name: productName,
      exact: true,
    });
  }

  async addProductToCart(productName: string) {
    await this.getProductCard(productName)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeProductFromCart(productName: string) {
    await this.getProductCard(productName)
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async openProductDetails(productName: string) {
    await this.getProductName(productName).click();
  }

  async openProductDetailsByImage(productName: string) {
    await this.getProductImage(productName).click();
  }

  async selectSortOption(option: string) {
    await this.sortSelect.selectOption(option);
  }
}
