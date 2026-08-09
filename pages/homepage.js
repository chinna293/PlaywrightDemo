const { expect } = require("@playwright/test")
const { log } = require("node:console")

class HomePage
{
    constructor(page)
    {
        this.page = page
        this.productsheadername = page.getByText("Products")
        this.menu = page.locator("//button[@id='react-burger-menu-btn']")
        this.logoutbtn = page.getByText("Logout")
        this.product = page.locator(".inventory_item_label")
        this.sortdropdown = page.locator(".product_sort_container")
        this.allproductnames = page.locator(".inventory_item_name")
        this.allproductprices = page.locator(".inventory_item_price")
        this.items = page.locator('.inventory_item')
        this.firstproduct = page.locator('.inventory_item').nth(0).locator('.inventory_item_name')
        this.secondproduct = page.locator(".inventory_item").nth(1).locator(".inventory_item_name ")
        this.firstitemprice = page.locator(".inventory_item").nth(0).locator(".inventory_item_price")
        this.seconditemprice = page.locator(".inventory_item").nth(1).locator("inventory_item_price")
        this.firstproductcartbtn = page.locator(".inventory_item").nth(0).getByRole('button',{name: 'Add to cart'})
        this.secondproductcartbtn = page.locator(".inventory_item").nth(1).getByRole('button',{name: 'Add to cart'})
        this.removebtn = page.locator('#remove-sauce-labs-backpack')
        this.cartnumber = page.locator("//span[@class='shopping_cart_badge']")
        this.removebtn =  page.locator('#remove-sauce-labs-backpack')
        this.cartbutton = page.locator(".shopping_cart_link")
    }

    async verifyname()
    {
        expect(this.productsheadername).toContainText("Products")
    }

    async productcount()
    {
        return  await this.product.count()
    }

    async atozorder()
    {
        await this.sortdropdown.selectOption({label : 'Name (A to Z)'})
        const names = await this.allproductnames.allTextContents()
        console.log(names)
        const sortnames = [...names].sort()
        console.log(sortnames)
        expect(names).toEqual(sortnames)
    }

    async ztoaorder()
    {
        await this.sortdropdown.selectOption({label : 'Name (A to Z)'})
        const ascnames = await this.allproductnames.allTextContents()
        await this.sortdropdown.selectOption({label : 'Name (Z to A)'})
        const decnames = await this.allproductnames.allTextContents()
        console.log(decnames)
        expect(ascnames).toEqual(decnames.reverse())
    }

    async lowtohigh()
    {
        await this.sortdropdown.selectOption({label : 'Price (low to high)'})
        const pricetext = await this.allproductprices.allTextContents()
        console.log(pricetext)
        const priceltoh = pricetext.map(p => parseFloat(p.replace('$','')))
        console.log(priceltoh)

        for(let i = 0 ; i< priceltoh.length-1 ; i++)
        {
            expect(priceltoh[i]).toBeLessThanOrEqual(priceltoh[i+1])
        }
    }

    async hightolow()
    {
        await this.sortdropdown.selectOption({label : 'Price (high to low)'})
        const pricetext2 = await this.allproductprices.allTextContents()
        console.log(pricetext2)
        const pricehtol = pricetext2.map(p => parseFloat(p.replace('$','')))
        console.log(pricehtol)
        for(let j = 0; j< pricehtol.length-1;j++)
        {
            expect(pricehtol[j]).toBeGreaterThanOrEqual(pricehtol[j+1])
        }
        
    }

    async addoneitem(index)
    {
        await expect(this.firstproductcartbtn).toBeVisible()
        await this.items.nth(index).getByRole('button',{name: 'Add to cart'}).click()
        await expect(this.removebtn).toBeVisible()
        const count = await this.cartnumber.textContent()
        expect(count).toBe("1")
        await this.removebtn.click()
    }

    async addmultipleitems(index1,index2)
    {
        await this.items.nth(index1).getByRole('button',{name: 'Add to cart'}).click()
        await this.items.nth(index2).getByRole('button',{name: 'Add to cart'}).click()
        const count = await this.cartnumber.textContent()
        expect(count).toBe("2")
    }

    async getNameAndPrice(index)
    {
        const name = await this.items.nth(index).locator(".inventory_item_name ").textContent()
        const price = await this.items.nth(index).locator(".inventory_item_price ").textContent()
        return { name, price };
    }


    async cartlink()
    {
        await this.cartbutton.click()
    }

    async logoutfromapplication()
    {
        await this.menu.click()
        await this.logoutbtn.click()
    }
}
module.exports = HomePage;