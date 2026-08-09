import {test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'

test('removeitemsfromcart' , async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.addmultipleitems()
    await page.locator(".shopping_cart_link").click()
    if(await page.getByText("Remove").isVisible())
    {
        await page.getByText("Remove").click()
    }
    await page.pause()
})