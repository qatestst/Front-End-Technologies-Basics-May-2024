const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

let token;

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    

    describe("authentication", () => {
        test("register makes correct api call", async () => {
            //arrange
            await page.goto(host);
            await page.click("text=Register");
            await page.waitForSelector('form');
            let random = Math.floor(Math.random()*10000);
            user.email = `abv${random}@abv.bg`;

            //act
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#repeatPassword').fill(user.confirmPass);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/register") && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();

            //assert
            await expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test("Login makes correct API call ", async () =>{
            //arrange
            await page.goto(host);
            await page.click("text=Login");
            await page.waitForSelector('form');
            
            //act
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);


            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/login") && response.status() == 200),
                page.click('[type="submit"]')
            ])
            let userData = await response.json();
            console.log(userData);

            //assert
            await expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);

            token = userData.accessToken;
                        
        });

        test("Logout makes correct API call ", async () =>{
            //arrange
            await page.goto(host);
            await page.click("text=Login");
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/logout") && response.status() == 204),
                page.click('nav >> text=Logout')
            ])

            //assert
            await expect(response.ok()).toBeTruthy();
            await page.waitForSelector('nav >> text=Login')
            await expect(page.url()).toBe(host + '/');     
                                   
        })

    });

    describe("navbar", () => {
        test('Logged user should see correct navigation buttons',async () =>{
            //arrange & //act
            await page.goto(host);
            await page.click("text=Login");
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]');

            //assert
            await expect(page.locator('nav >> text=Theater')).toBeVisible();
            await expect(page.locator('nav >> text=Profile')).toBeVisible();
            await expect(page.locator('nav >> text=Create Event')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        })

        test('guest user should see correct navigation buttons', async ()=>{
             //arrange & //act
             await page.goto(host);
              
             //assert
             await expect(page.locator('nav >> text=Login')).toBeVisible();
             await expect(page.locator('nav >> text=Register')).toBeVisible();
             await expect(page.locator('nav >> text=Theater')).toBeVisible();

             await expect(page.locator('nav >> text=Profile')).toBeHidden();
             await expect(page.locator('nav >> text=Create Event')).toBeHidden();
             await expect(page.locator('nav >> text=Logout')).toBeHidden();
                        
        });

    });

    describe("CRUD", () => {
        beforeEach(async () =>{
            await page.goto(host);
            await page.click("text=Login");
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('[type="submit"]');

        })

        test('Create makes correct API call', async ()=> {
           await page.click('nav >> text=Create Event');
           await page.waitForSelector('form');

           await page.fill('#title', 'Random title');
           await page.fill('#date', 'Random 11/11/2024');
           await page.fill('#author', 'Random author');
           await page.fill('#description', 'Random description');
           await page.fill('#imageUrl', '/images/backgroung.png');

           
           let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/theaters") && response.status() == 200),
                page.click('[type="submit"]')
            ]);

            await expect(response.ok()).toBeTruthy();
            let responseData = await response.json();
            console.log(responseData);

            //expect(response).toBe(user.password);
            await expect(responseData.author).toEqual('Random author');
            await expect(responseData.title).toEqual('Random title');
            await expect(responseData.imageUrl).toEqual('/images/backgroung.png');
            await expect(responseData.description).toEqual('Random description');
            await expect(responseData.date).toEqual('Random 11/11/2024');
                    
        })

        test('Edit an event', async() =>{
           await page.click('nav >> text=Profile');
           await page.waitForSelector('text=Details');
           await page.locator('text=Details').first().click();
           //await page.click('text=Details');
           await page.waitForSelector('text=Edit');
           await page.click('text=Edit');
           await page.waitForSelector('form');


           await page.fill('#title', 'Edited title');
           await page.fill('#date', 'Edited date');
           await page.fill('#author', 'Edited author');
           await page.fill('#description', 'Edited description');
           await page.fill('#imageUrl', 'Edited imageUrl');



           let [response] = await Promise.all([
            page.waitForResponse(response => response.url().includes("/data/theaters") && response.status() == 200),
            page.click('[type="submit"]')
            ]);

            await expect(response.ok()).toBeTruthy();
            let responseData = await response.json();
            console.log(responseData);

            //expect(response).toBe(user.password);
            await expect(responseData.author).toEqual('Edited author');
            await expect(responseData.title).toEqual('Edited title');
            await expect(responseData.imageUrl).toEqual('Edited imageUrl');
            await expect(responseData.description).toEqual('Edited description');
            await expect(responseData.date).toEqual('Edited date');


        });

        test('Delete an event', async ()=>{
           await page.click('nav >> text=Profile');
           await page.locator('text=Details').first().click();
            
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/theaters") && response.status() == 200),
                page.on('dialog', dialog => dialog.accept()),
                page.click('text=Delete')
            ]);
    
            await expect(response.ok()).toBeTruthy();
            let responseData = await response.json();
            console.log(responseData);
        });
        
    })
})