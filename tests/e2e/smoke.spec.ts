/**
 * E2E Smoke Test: basic page load & content verification.
 *
 * Verifies:
 * - Page loads without JS errors
 * - Property cards are rendered
 * - Arabic text content is displayed correctly
 * - No console errors during load
 */
import { test, expect } from '@playwright/test'

test.describe('Seyran Syria — Smoke Tests', () => {
  test('page loads and renders property cards', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // The app should have loaded and rendered
    await expect(page.locator('body')).toBeVisible()

    // Check for the brand name "سيران" somewhere on the page
    const body = await page.textContent('body')
    expect(body).toContain('سيران')

    // Property cards should be rendered (the mock data has at least 5 properties)
    // Each card has a price or title — look for common markers
    const cards = page.locator('[class*="rounded"]').filter({
      has: page.locator('text=/\\$\\d+|ل\\.س/')
    })
    // At least 1 card should show a price
    await expect(cards.first()).toBeVisible({ timeout: 10_000 })

    // No JS errors during load
    expect(errors).toEqual([])
  })

  test('bottom navigation bar is visible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }) // iPhone-like
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Bottom nav should contain navigation items
    const bottomNav = page.locator('nav, [class*="bottom"], [class*="fixed bottom"]').last()
    await expect(bottomNav).toBeVisible({ timeout: 5_000 })
  })

  test('page title or meta is set', async ({ page }) => {
    await page.goto('/')
    const title = await page.title()
    // Should have some title (default Vite title or custom)
    expect(title.length).toBeGreaterThan(0)
  })
})
