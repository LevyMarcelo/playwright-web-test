import { test } from '@playwright/test';
import { SearchGooglePage } from '../pages/search-google-page';

let searchGooglePage: SearchGooglePage;

test.beforeEach(async ({ page }) => {
  searchGooglePage = new SearchGooglePage(page);
})

test('Search Google Test', async ({ page }) => {
  await searchGooglePage.goto();
  await searchGooglePage.fillSearchField('Playwright');
  await searchGooglePage.clickSearchButton();
  await searchGooglePage.validateSearchGoogle('Playwright: Fast and reliable end-to-end testing for modern ...');
});