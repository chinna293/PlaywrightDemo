import{test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'

test('All products', async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret_sauce")
    await homepage.verifyname()
    expect(await homepage.productcount()).toBe(6)
    console.log(await homepage.productcount())
})