import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage.po";

export class CheckoutCompletePage extends BasePage {
    readonly _returnHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this._returnHomeButton = this.page.locator('data-test=back-to-products');
    }

    async clickReturnHomeButton(): Promise<void> {
        await this._returnHomeButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

}
