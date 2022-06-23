import { Page, expect } from '@playwright/test';

export class SearchGooglePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.google.com.br/');
  }

  async fillSearchField(value: string) {
    await this.page.fill('input[name="q"]', value);
  }

  async clickSearchButton() {
    await this.page.click('input[name="btnK"]');
  }

  async validateSearchGoogle(value: string) {
    const element = this.page.locator('div#rso div > div > div > div > div > div.yuRUbf > a > h3');
    await expect(element).toHaveText(value);
  }
}