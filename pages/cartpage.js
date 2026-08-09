const { expect } = require("@playwright/test")

class CartPage
{
    constructor(page)
    {
        this.page = page
        this.saucelabbackcartitem = page.locator('.cart_item', { hasText: 'Sauce Labs Backpack' })
        this.saucelabsbikecartitem = page.locator('.cart_item', { hasText: 'Sauce Labs Bike Light' })
        this.saucelabbackremovebtn = page.locator("//button[@id='remove-sauce-labs-backpack']")
        this.cartbadge = page.locator(".shopping_cart_badge")
        this.ctnshoppingbtn = page.locator("#continue-shopping")
        this.checkoutbtn = page.locator("#checkout")
    }

    async cartshowsaddeditem()
    {
        expect(this.saucelabbackcartitem).toBeVisible();
        expect(this.saucelabsbikecartitem).toBeVisible()
    }

    async verifycartbadgenumberupdates()
    {
        await this.saucelabbackremovebtn.click()
        const number = await this.cartbadge.textContent()
        expect(number).toBe("2")
    }

    async clickcontinueshopping()
    {
        await this.ctnshoppingbtn.click()
    }

    async clickcheckoutbtn()
    {
        await this.checkoutbtn.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html")
    }
}
module.exports = CartPage;