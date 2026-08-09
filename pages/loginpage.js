const { expect } = require("@playwright/test")

class LoginPage
{
    constructor(page)
    {
        this.page = page
        this.username = page.getByPlaceholder('Username')
        this.password = page.getByPlaceholder('Password')
        this.submitBtn = page.locator('//input[@type="submit"]')
        this.lockedouterror = page.locator("//div[@class='error-message-container error']")
        this.wrongpassworderror = page.locator("h3[data-test='error']")
        this.nousernameerror = page.getByText("Epic sadface: Username is required")
        this.nopassworderror = page.getByText("Epic sadface: Password is required")
        this.errormessagedismssbtn = page.locator("button[type='button'] svg")
    }

    async navigate()
    {
        await this.page.goto("https://www.saucedemo.com/")
    }

    async Logintoapplication(user,pass)
    {
        await this.username.fill(user)
        await this.password.fill(pass)
        await this.submitBtn.click()
    }

    async Enteronlypassword(pass)
    {
        await this.password.fill(pass)
        await this.submitBtn.click()
    }

    async Enteronlyusername(user)
    {
        await this.username.fill(user)
        await this.submitBtn.click()
    }

    async dismisserrorbtn()
    {
        await this.errormessagedismssbtn.click()
    }

    async bothfieldempty()
    {
        await this.submitBtn.click()
    }

    async verifyloginpage()
    {
        expect(this.submitBtn).toBeVisible()
    }

    async errortext()
    {
        expect(this.lockedouterror).toBeVisible()
    }

    async passworderror()
    {
        expect(this.wrongpassworderror).toBeVisible()
    }

    async usernamerequriederror()
    {
        expect(this.nousernameerror).toContainText("Epic sadface: Username is required")
    }

    async passwordrequriederror()
    {
        expect(this.nopassworderror).toContainText("Epic sadface: Password is required")
    }


}
module.exports = LoginPage;