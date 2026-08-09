import {test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'
import CartPage from '../pages/cartpage'
import CheckoutInfoPage1 from '../pages/checkoutinfopage1'

test('Valid checkout info ', async ({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    const cartpage = new CartPage(page)
    const checkoutpage1 = new CheckoutInfoPage1(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.addmultipleitems()
    await homepage.cartlink()
    await cartpage.clickcheckoutbtn()
    await checkoutpage1.verifypage1header()
    await checkoutpage1.validcheckoutinfo("narasimha", "reddy", "518502")
    await expect(page.getByText("Checkout: Overview")).toBeVisible()
    await page.pause()
})

test.only("invalid checkout info", async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    const cartpage = new CartPage(page)
    const checkoutpage1 = new CheckoutInfoPage1(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.addmultipleitems(0,1)
    await homepage.cartlink()
    await cartpage.clickcheckoutbtn()
    await checkoutpage1.verifypage1header()
    await checkoutpage1.missingfirstname()
    await checkoutpage1.missingLastname("narasimha")
    await checkoutpage1.missingpostalcode("narasimha","reddy")
    await checkoutpage1.clickcancelbtn()

})