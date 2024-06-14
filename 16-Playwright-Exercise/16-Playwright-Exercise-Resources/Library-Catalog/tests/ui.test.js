import { test , expect } from '@playwright/test';
import { LOGIN_FORM, NAVBAR } from '../utils/locators.js';
import { BASE_URL, TEST_URL, TEST_USER } from '../utils/constants.js';


//TEST Verify "All books" link is visible in Vavigation bar

test('Verify "All books" link is visible - example 1', async({page}) => {
    await page.goto('http://localhost:3000');


    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);

})

test('Verify "All books" link is visible - example 2', async({page}) => {
    await page.goto(BASE_URL);
    
    await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();
    await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();

})


// TEST IF register button is visible
test('Test if register button is visible', async ({page}) => {
    await page.goto(BASE_URL);
    await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
})

//TEST If login button is visible
test('TEST If login button is visible', async ({page}) => {
    await page.goto(BASE_URL);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
})

// TEST Verify if "All books" link is visible after user login
test('TEST Verify if "All books" link is visible after user login', async ({page})=>{
    //Arrange
    await page.goto(BASE_URL);
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    
    await page.locator(NAVBAR.LOGIN_BUTTON).click();

    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await expect(page.locator(LOGIN_FORM.LOGIN_BUTTON)).toBeVisible();
    await expect(page.locator(LOGIN_FORM.EMAIL)).toBeVisible();
    await expect(page.locator(LOGIN_FORM.PASSWORD)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    //Assert
    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);




})

