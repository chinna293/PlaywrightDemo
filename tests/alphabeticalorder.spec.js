import {test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'

test("A to z order", async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.productcount()

    await homepage.atozorder()
    await homepage.ztoaorder()
    await homepage.lowtohigh()
    await homepage.hightolow()

    await page.pause()
})