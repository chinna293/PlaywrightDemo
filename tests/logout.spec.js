import {test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'

test('Logout from Application', async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    
    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    await homepage.logoutfromapplication()
    await loginpage.verifyloginpage()
    await page.pause()
})