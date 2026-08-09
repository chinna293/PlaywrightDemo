const { expect } = require("@playwright/test")

class CheckoutInfoPage1
{
    constructor(page)
    {
        this.page = page
        this.page1header = page.getByText("Checkout: Your Information")
        this.firstname = page.getByPlaceholder('First Name')
        this.lastname = page.getByPlaceholder("Last Name")
        this.Postalcode = page.getByPlaceholder("Zip/Postal Code")
        this.continuebtn = page.locator("#continue")
        this.firstnameerror = page.getByText("Error: First Name is required")
        this.lastnameerror = page.getByText("Error: Last Name is required")
        this.postalcoderror = page.getByText("Error: Postal Code is required")
        this.cancelbtn = page.locator("#cancel")
    }

    async verifypage1header()
    {
        await expect(this.page1header).toBeVisible()
    }

    async validcheckoutinfo(name1,name2,zipcode)
    {
        await this.firstname.fill(name1)
        await this.lastname.fill(name2)
        await this.Postalcode.fill(zipcode)
        await this.continuebtn.click()
    }

    async missingfirstname()
    {
        await this.continuebtn.click()
        await expect(this.firstnameerror).toContainText("Error: First Name is required")
    }

    async missingLastname(name1)
    {
        await this.firstname.fill(name1)
        await this.continuebtn.click()
        await expect(this.lastnameerror).toContainText("Error: Last Name is required")
    }

    async missingpostalcode(name1,name2)
    {
        await this.firstname.fill(name1)
        await this.lastname.fill(name2)
        await this.continuebtn.click()
        await expect(this.postalcoderror).toContainText("Error: Postal Code is required")
    }

    async clickcancelbtn()
    {
        await this.cancelbtn.click()
        await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html")
    }
}
module.exports = CheckoutInfoPage1;