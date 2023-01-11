import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage.po";

export class ShoppingCart extends BasePage {
    readonly _checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this._checkoutButton = this.page.locator('data-test=checkout');

    }

    async clickCheckoutButton(): Promise<void> {
        await this._checkoutButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    }
};
