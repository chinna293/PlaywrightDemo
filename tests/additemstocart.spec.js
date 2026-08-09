import {test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'

test('addsinfleitem', async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.addoneitem(0)
    await homepage.addmultipleitems(0,1)
    //await page.locator('#remove-sauce-labs-backpack').click()
    await page.pause()

})