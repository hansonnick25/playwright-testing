import { Page } from "@playwright/test";
import { Utilities } from "../utilities";

export abstract class BasePage {

    protected readonly utilities: Utilities;

    constructor(readonly page: Page) {
        this.utilities = new Utilities(page);
    }

    protected async navigateTo(path?: string): Promise<void> {
        if (path)
            await this.page.goto(path);
        else
            await this.page.goto('/');
    }
}