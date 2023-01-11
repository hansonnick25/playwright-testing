import { expect, Locator, Page } from "@playwright/test";
import { StoreItem } from "../testdata/items";
import { BasePage } from "./basepage.po";

export class InventoryPage extends BasePage {
    readonly _shoppingCartIcon: Locator;

    constructor(page: Page) {
        super(page);
        this._shoppingCartIcon = this.page.locator('#shopping_cart_container a');
    }

    override async navigateTo(): Promise<void> {
        await super.navigateTo('/inventory.html');
        await expect(this._shoppingCartIcon).toBeVisible();
    }

    async addItemToShoppingCart(item: StoreItem): Promise<void> {
        await this.page.click('id=add-to-cart-' + item.partialLocator);
        await expect(this.page.locator(item.itemLocator)).toHaveText(item.itemTitle);
    }

    async removeItemFromShoppingCart(item: StoreItem): Promise<void> {
        await this.page.click('id=remove-' + item.partialLocator);
        await expect(this.page.locator(item.itemLocator)).toHaveText(item.itemTitle);
    }

    async verifyNumberOfItemsInCart(total: string): Promise<void> {
        await expect(this._shoppingCartIcon).toHaveText(total);
    }

    async viewShoppingCart(): Promise<void> {
        await this._shoppingCartIcon.click();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    }
}
