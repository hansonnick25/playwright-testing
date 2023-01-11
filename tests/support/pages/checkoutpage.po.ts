import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage.po";

export class CheckoutPage extends BasePage {
    readonly _continueButton: Locator;
    readonly _firstNameField: Locator;
    readonly _lastNameField: Locator;
    readonly _postalCodeField: Locator;
    readonly _errorMessage: Locator;
    readonly _finishCheckoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this._continueButton = this.page.locator('data-test=continue');
        this._firstNameField = this.page.locator('data-test=firstName');
        this._lastNameField = this.page.locator('data-test=lastName');
        this._postalCodeField = this.page.locator('data-test=postalCode');
        this._errorMessage = this.page.locator('data-test=error');
        this._finishCheckoutButton = this.page.locator('data-test=finish');
    }

    async enterFirstName(firstName: string): Promise<void> {
        await this._firstNameField.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this._lastNameField.fill(lastName);
    }

    async enterPostalCode(postalCode: string): Promise<void> {
        await this._postalCodeField.fill(postalCode);
    }

    async clickContinueButton(): Promise<void> {
        await this._continueButton.click();
    }

    async clickFinishCheckoutButton(): Promise<void> {
        await this._finishCheckoutButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(this.page.getByRole('img', { name: 'Pony Express' })).toBeVisible();
    }

    async verifyErrorMessage(error: string): Promise<void> {
        await expect(this._errorMessage).toHaveText(error);
    }

}
