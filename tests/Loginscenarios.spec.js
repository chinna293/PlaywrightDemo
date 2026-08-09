import {test,expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import HomePage from '../pages/homepage'

test('Locked out user', async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("locked_out_user","secret_sauce")
    await loginpage.errortext()
})

test("Wrong password", async({page})=>{

    const loginpage = new LoginPage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("standard_user","secret")
    await loginpage.passworderror()
})

test("only password", async({page})=>{

    const loginpage = new LoginPage(page)

    await loginpage.navigate()
    await loginpage.Enteronlypassword("secret")
    await loginpage.usernamerequriederror()
})

test("only username", async({page})=>{

    const loginpage = new LoginPage(page)

    await loginpage.navigate()
    await loginpage.Enteronlyusername("standard_user")
    await loginpage.passwordrequriederror()
})

test("bothfield empty", async({page})=>{

    const loginpage = new LoginPage(page)

    await loginpage.navigate()
    await loginpage.bothfieldempty()
    await loginpage.usernamerequriederror()
})

test("problem_user login", async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)
    
    await loginpage.navigate()
    await loginpage.Logintoapplication("problem_user","secret_sauce")
    await homepage.verifyname()

    const images = await page.locator("img[class='inventory_item_img']")
    const image1 = await images.nth(0).getAttribute('src')
    const image2 = await images.nth(1).getAttribute('src')

    console.log(image1)
    console.log(image2)
    expect(image1).toBe(image2)

})

test('performance_glitch_user', async({page})=>{

    const loginpage = new LoginPage(page)
    const homepage = new HomePage(page)

    await loginpage.navigate()
    await loginpage.Logintoapplication("performance_glitch_user","secret_sauce")
    await homepage.verifyname()
})

test("error message dimiss", async({page})=>{

    const loginpage = new LoginPage(page)

    await loginpage.navigate()
    await loginpage.Enteronlyusername("standard_user")
    await loginpage.passwordrequriederror()
    await loginpage.dismisserrorbtn()
})