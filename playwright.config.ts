import { defineConfig } from '@playwright/test';

export default defineConfig({
  forbidOnly: !!process.env.CI,
  reporter: [['html', { outputFolder: 'report' }]],
  testDir: './tests',
  outputDir: 'test-results',
  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    browserName: 'chromium',

    // launchOptions: { slowMo: 1000 },
  },
});
