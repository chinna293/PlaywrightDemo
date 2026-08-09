import {test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'
import CartPage from '../pages/cartpage'
import CheckoutInfoPage1 from '../pages/checkoutinfopage1'
import CheckoutInfoPage2 from '../pages/checkoutinfopage2'

test("overview of checkout", async ({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    const cartpage = new CartPage(page)
    const checkoutinfopage1 = new CheckoutInfoPage1(page)
    const checkoutinfopage2 = new CheckoutInfoPage2(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    const item1 = await homepage.getNameAndPrice(0)
    const item2 = await homepage.getNameAndPrice(1)
    await homepage.addmultipleitems(0,1)
    await homepage.cartlink()
    await cartpage.clickcheckoutbtn()
    await checkoutinfopage1.verifypage1header()
    await checkoutinfopage1.validcheckoutinfo("narasimha", "reddy", "518502")
    await checkoutinfopage2.verifyheader()
    await expect(checkoutinfopage2.getitemname(0)).toHaveText(item1.name)
    await expect(checkoutinfopage2.getitemname(1)).toHaveText(item2.name)
    await expect(checkoutinfopage2.getitemprice(0)).toHaveText(item1.price)
    await expect(checkoutinfopage2.getitemprice(1)).toHaveText(item2.price)
    const expectedsubtotal = parseFloat(item1.price.replace('$' , ''))+ parseFloat(item2.price.replace('$', ''))
    const actualsubtotal = await checkoutinfopage2.getsubtotal()
    await expect(actualsubtotal).toBeCloseTo(expectedsubtotal,2)
    await checkoutinfopage2.clickcancelbtn()
})

test("completing the checkout", async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    const cartpage = new CartPage(page)
    const checkoutinfopage1 = new CheckoutInfoPage1(page)
    const checkoutinfopage2 = new CheckoutInfoPage2(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    const item1 = await homepage.getNameAndPrice(0)
    const item2 = await homepage.getNameAndPrice(1)
    await homepage.addmultipleitems(0,1)
    await homepage.cartlink()
    await cartpage.clickcheckoutbtn()
    await checkoutinfopage1.verifypage1header()
    await checkoutinfopage1.validcheckoutinfo("narasimha", "reddy", "518502")
    await checkoutinfopage2.verifyheader()
    await checkoutinfopage2.clickfinishbtn()
    await checkoutinfopage2.clickbackhomebtn()
    await page.pause()
})