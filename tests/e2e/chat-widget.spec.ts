/**
 * E2E Tests for the Seyran Live Chat Widget (WhatsAppSupportFAB).
 *
 * Verifies:
 * - Chat FAB is visible and opens the chat panel
 * - Welcome message from "مستشار سيران الذكي" is displayed
 * - User can type and send a message
 * - Concierge receives and displays the user's message
 * - Chat supports switching between in-app chat and WhatsApp mode
 */
import { test, expect } from '@playwright/test'

test.describe('Seyran Chat Widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('chat FAB is visible and opens chat panel', async ({ page }) => {
    // Select the FAB specifically by its title
    const fab = page.locator('button[title="مستشار سيران الذكي والدعم الفني"]')
    await expect(fab).toBeVisible({ timeout: 10_000 })

    // Click the FAB to open chat
    await fab.click()

    // Chat header should be visible
    const chatTitle = page.locator('h4:has-text("مستشار سيران الذكي")')
    await expect(chatTitle).toBeVisible({ timeout: 5_000 })
  })

  test('welcome message is displayed', async ({ page }) => {
    const fab = page.locator('button[title="مستشار سيران الذكي والدعم الفني"]')
    await expect(fab).toBeVisible({ timeout: 10_000 })
    await fab.click()

    // Check for the welcome message text
    const welcomeText = page.locator('text=أهلاً بك في منصة سيران سوريا')
    await expect(welcomeText).toBeVisible({ timeout: 5_000 })
  })

  test('user can type and send a message', async ({ page }) => {
    const fab = page.locator('button[title="مستشار سيران الذكي والدعم الفني"]')
    await expect(fab).toBeVisible({ timeout: 10_000 })
    await fab.click()

    // Find the input field
    const input = page.locator('input[placeholder*="اكتب استفسارك هنا"]')
    await expect(input).toBeVisible({ timeout: 5_000 })

    // Fill message and press enter or click send
    const testMessage = 'هل يتوفر شاليه في يعفور؟'
    await input.fill(testMessage)
    await input.press('Enter')

    // The user's message should now appear in the chat stream
    const userMsg = page.locator(`text=${testMessage}`)
    await expect(userMsg).toBeVisible({ timeout: 10_000 })
  })

  test('chat has in-app and whatsapp tabs', async ({ page }) => {
    const fab = page.locator('button[title="مستشار سيران الذكي والدعم الفني"]')
    await expect(fab).toBeVisible({ timeout: 10_000 })
    await fab.click()

    // Mode switch buttons
    const inAppTab = page.locator('button:has-text("المحادثة المباشرة")')
    const whatsappTab = page.locator('button:has-text("واتساب سيران")')

    await expect(inAppTab).toBeVisible({ timeout: 5_000 })
    await expect(whatsappTab).toBeVisible({ timeout: 5_000 })

    // Switch to WhatsApp mode
    await whatsappTab.click()
    const waNotice = page.locator('text=تواصل مباشر عبر تطبيق واتساب الرسمي')
    await expect(waNotice).toBeVisible({ timeout: 5_000 })

    // Switch back to in-app
    await inAppTab.click()
    const welcomeText = page.locator('text=أهلاً بك في منصة سيران سوريا')
    await expect(welcomeText).toBeVisible({ timeout: 5_000 })
  })
})
