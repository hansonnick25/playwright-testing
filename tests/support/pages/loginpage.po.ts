import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage.po";

export class LoginPage extends BasePage {
    readonly _loginButton: Locator;
    readonly _usernameField: Locator;
    readonly _passwordField: Locator;

    constructor(page: Page) {
        super(page);
        this._loginButton = this.page.locator('data-test=login-button');
        this._usernameField = this.page.locator('data-test=username');
        this._passwordField = this.page.locator('data-test=password');
    }

    override async navigateTo(): Promise<void> {
        await super.navigateTo('https://saucedemo.com');
        await expect(this._loginButton).toBeVisible();
    }

    async submitLogin(): Promise<void> {
        await this._loginButton.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async enterUsername(username: string): Promise<void> {
        await this._usernameField.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this._passwordField.fill(password);
    }
}
