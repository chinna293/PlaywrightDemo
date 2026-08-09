const { expect } = require("@playwright/test")

class CheckoutInfoPage2
{
    constructor(page)
    {
        this.page = page
        this.overviewheader = page.getByText("Checkout: Overview")
        this.cartitems = page.locator('.cart_item')
        this.totalamount = page.locator(".summary_subtotal_label")
        this.cancelbtn = page.locator(".cart_footer").locator("#cancel")
        this.finishbtn = page.locator(".cart_footer").locator("#finish")
        this.successmessage = page.locator(".complete-header")
        this.backhomebtn = page.locator(".complete-buttons").getByRole('button', { name : 'Back Home'})
    }

    async verifyheader()
    {
        await expect(this.overviewheader).toBeVisible()
    }

    getitemname(index)
    {
        return this.cartitems.nth(index).locator('.inventory_item_name')
    }

    getitemprice(index)
    {
        return this.cartitems.nth(index).locator('.inventory_item_price')
    }

    async getsubtotal()
    {
        const subtotaltext = await this.totalamount.textContent()
        return parseFloat(subtotaltext.replace('Item total: $', ''))
    }

    async clickcancelbtn()
    {
        await this.cancelbtn.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html")
    }

    async clickfinishbtn()
    {
        await this.finishbtn.click()
        await expect(this.successmessage).toHaveText("Thank you for your order!")
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html")
    }

    async clickbackhomebtn()
    {
        await this.backhomebtn.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html")
    }
}
module.exports=CheckoutInfoPage2;