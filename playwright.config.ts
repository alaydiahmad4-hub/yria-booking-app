import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    locale: 'ar-SY',
    timezoneId: 'Asia/Damascus'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: [
    {
      command: 'node server/server.js',
      port: 5001,
      reuseExistingServer: true,
      timeout: 10_000
    },
    {
      command: 'npx vite --port 3000',
      port: 3000,
      reuseExistingServer: true,
      timeout: 15_000
    }
  ]
})
