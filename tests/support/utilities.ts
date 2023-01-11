import { Locator, Page } from "@playwright/test";

export class Utilities {
    constructor(readonly page: Page) { }
    //Only use this wait for Visible if you absolutely need it
    //ideally you shouldn't have to utilize this in your tests

    async waitForSlowElement(locator: Locator): Promise<boolean> {
        const timeout = 5000;
        const maxTime = Date.now() + timeout;
        const step = 500;

        while (Date.now() < maxTime) {
            if (await locator.isVisible()) {
                return true;
            }
            else {
                await this.page.waitForTimeout(step);
            }
        }

        return false;
    }
}
