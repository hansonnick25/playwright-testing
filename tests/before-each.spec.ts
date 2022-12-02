import { expect, Page, test } from "@playwright/test"

test.describe.configure({ mode: 'serial' })

let page: Page;

test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/')
    await page.locator('data-test=username ').click()
    await page.locator('data-test=username').fill('standard_user')
    await page.locator('data-test=password').click()
    await page.locator('data-test=password').fill('secret_sauce')
    await page.locator('data-test=login-button').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})

test.describe('Sauce Lab Tests', () => {
    test.describe('Add/Remove from Cart', () => {
        test.beforeEach(async () => {
            await page.click('id=add-to-cart-sauce-labs-backpack')
            await page.click('id=add-to-cart-sauce-labs-bike-light')
            await page.click('id=add-to-cart-sauce-labs-bolt-t-shirt')
            await page.click('id=add-to-cart-sauce-labs-fleece-jacket')
            await page.click('id=add-to-cart-sauce-labs-onesie')
            await page.click('id=add-to-cart-test.allthethings()-t-shirt-(red)')
        })

        test('Add Merch to Cart', async () => {
            await expect(page.locator('#shopping_cart_container a')).toHaveText('6')
        })

        test('Remove Merch from Cart', async () => {
            await page.click('id=remove-sauce-labs-backpack')
            await page.click('id=remove-sauce-labs-bike-light')
            await page.click('id=remove-sauce-labs-bolt-t-shirt')
            await page.click('id=remove-sauce-labs-fleece-jacket')
            await page.click('id=remove-sauce-labs-onesie')
            await page.click('id=remove-test.allthethings()-t-shirt-(red)')
            await expect(page.locator('#shopping_cart_container a')).toHaveText('')
        })
    })

    test.describe('Checkout Tests', () => {
        test.beforeEach(async () => {
            await page.click('id=add-to-cart-sauce-labs-backpack')
            await expect(page.locator('#shopping_cart_container a')).toHaveText('1')
            await page.locator('#shopping_cart_container a').click()
            await page.locator('data-test=checkout').click()
        })

        test('Missing Required Info', async () => {
            await page.locator('data-test=firstName').click()
            await page.locator('data-test=lastName').click()
            await page.locator('data-test=lastName').fill('Hanson')
            await page.locator('data-test=postalCode').click()
            await page.locator('data-test=postalCode').fill('63074')
            await page.locator('data-test=continue').click()
            await expect(page.locator('data-test=error')).toHaveText('Error: First Name is required')
        })

        test('Happy Path Checkout', async () => {
            await page.locator('data-test=firstName').click()
            await page.locator('data-test=firstName').fill('Nick')
            await page.locator('data-test=lastName').click()
            await page.locator('data-test=lastName').fill('Hanson')
            await page.locator('data-test=postalCode').click()
            await page.locator('data-test=postalCode').fill('63074')
            await page.locator('data-test=continue').click()
            await page.locator('data-test=finish').click()
            await expect(page.getByRole('img', { name: 'Pony Express' })).toBeVisible()
        })
    })
})

test.afterEach(async () => {
    await page.close()
})