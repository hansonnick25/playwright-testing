import { FullConfig, chromium, expect } from '@playwright/test'

async function globalSetup(config: FullConfig) {
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(baseURL!)
    await page.locator('data-test=username').fill(process.env.UI_USERNAME as string)
    await page.locator('data-test=password').click()
    await page.locator('data-test=password').fill(process.env.UI_PASSWORD as string)
    await page.locator('data-test=login-button').click()
    await expect(page).toHaveURL(baseURL + '/inventory.html')
    await page.context().storageState({ path: storageState as string })
    await browser.close()
}

export default globalSetup