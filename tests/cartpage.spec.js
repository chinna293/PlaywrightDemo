import {test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'
import CartPage from '../pages/cartpage'

test('cart shows added items', async({page})=>
{
    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    const cartpage = new CartPage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.addmultipleitems()
    await homepage.cartlink()
    await cartpage.cartshowsaddeditem()
    await cartpage.verifycartbadgenumberupdates()
    // await page.locator("//button[@id='remove-sauce-labs-backpack']").click()
    // const number = await page.locator(".shopping_cart_badge").textContent()
    // await expect(number).toBe("2")
    await cartpage.clickcontinueshopping()
    //await page.pause()
})

test("clcik checkout from cartpage", async ({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    const cartpage = new CartPage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.addmultipleitems()
    await homepage.cartlink()
    await cartpage.clickcheckoutbtn()

})

test("click checkout with 0 items", async ({page})=>{
    
    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    const cartpage = new CartPage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.cartlink()
    await cartpage.clickcheckoutbtn()
})