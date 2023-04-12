import test from "@playwright/test";
import { CheckoutCompletePage } from "../support/pages/checkoutcompletepage.po";
import { CheckoutPage } from "../support/pages/checkoutpage.po";
import { InventoryPage } from "../support/pages/inventorypage.po";
import { ShoppingCart } from "../support/pages/shoppingcartpage.po";
import {
  allTheThingsShirt,
  backpack,
  bikeLight,
  boltShirt,
  fleeceJacket,
  onesie,
} from "../support/testdata/items";

test.describe("Sauce Demo e2e Tests", () => {
  let inventoryPage: InventoryPage;
  let shoppingCart: ShoppingCart;
  let checkoutPage: CheckoutPage;
  let checkoutComplete: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    shoppingCart = new ShoppingCart(page);
    checkoutPage = new CheckoutPage(page);
    checkoutComplete = new CheckoutCompletePage(page);
  });

  test.describe("Items Can be Added/Removed from Cart", async () => {
    //add a bunch of items to the cart
    test.beforeEach(async () => {
      await inventoryPage.navigateTo();
      await inventoryPage.addItemToShoppingCart(backpack);
      await inventoryPage.addItemToShoppingCart(bikeLight);
      await inventoryPage.addItemToShoppingCart(boltShirt);
      await inventoryPage.addItemToShoppingCart(fleeceJacket);
      await inventoryPage.addItemToShoppingCart(onesie);
      await inventoryPage.addItemToShoppingCart(allTheThingsShirt);
    });

    test("Verify all Items were added to Cart", async () => {
      await inventoryPage.verifyNumberOfItemsInCart("6");
    });

    test("Remove all Items from Cart and Verify Removal", async () => {
      await inventoryPage.removeItemFromShoppingCart(backpack);
      await inventoryPage.removeItemFromShoppingCart(bikeLight);
      await inventoryPage.removeItemFromShoppingCart(boltShirt);
      await inventoryPage.removeItemFromShoppingCart(fleeceJacket);
      await inventoryPage.removeItemFromShoppingCart(onesie);
      await inventoryPage.removeItemFromShoppingCart(allTheThingsShirt);

      await inventoryPage.verifyNumberOfItemsInCart("");
    });
  });

  test.describe("Checkout Tests", () => {
    test.beforeEach(async () => {
      await inventoryPage.navigateTo();
      await inventoryPage.addItemToShoppingCart(backpack);
      await inventoryPage.verifyNumberOfItemsInCart("1");
      await inventoryPage.viewShoppingCart();
      await shoppingCart.clickCheckoutButton();
    });

    test("Missing First Name", async () => {
      await checkoutPage.enterLastName("Dobbs");
      await checkoutPage.enterPostalCode("90210");
      await checkoutPage.clickContinueButton();
      await checkoutPage.verifyErrorMessage("Error: First Name is required");
    });

    test("Happy Path Checkout", async () => {
      await checkoutPage.enterFirstName("Ronnie");
      await checkoutPage.enterLastName("Dobbs");
      await checkoutPage.enterPostalCode("90210");
      await checkoutPage.clickContinueButton();
      await checkoutPage.clickFinishCheckoutButton();
      await checkoutComplete.clickReturnHomeButton();
    });
  });
});
