// To run tests type in Terminal #npx playwright test e2e.test.js
// To run tests with UI type in Terminal # npx playwright test e2e.test.js --ui
// To run tests with Debug mode type in Terminal # npx playwright test e2e.test.js --debug

const {test, describe, beforeEach, afterEach, beforeAll, afterAll, expect} = require('@playwright/test');
const {chromium} = require('playwright');

const host = 'http://localhost:3000';
let browser;
let context;
let page;

let user = {
    email: '',
    password: '123456',
    confirmPass: '123456'
};

let game = {
    title: 'Random Title',
    category: 'Radndom Category',
    maxLevel: '71',
    imageUrl: './images/avatar-1.jpg',
    summary: 'Random summary'
}


describe('e2e tests', () => {
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

    describe ('authentication', () => {
    
        test('register makes correct API calls', async () => {
            await page.goto(host);
            await page.click('text=Register'); //Click on the 'Register' button Playwright ще изчака да види текст “Register” на страницата и след това ще извърши клик върху него
            //Wait for the register form to load
            await page.waitForSelector('form');
            // Create unique user email value
            let random = Math.floor(Math.random() * 1000);
            user.email = `abv_${random}@abv.bg`;
    
            await page.locator('#email').fill(user.email);
            await page.locator('#register-password').fill(user.password);
            await page.locator('#confirm-password').fill(user.confirmPass);
    
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('[type = "submit"]') // когато изпълните тази команда, Playwright ще кликне върху първия елемент с атрибут type="submit" на страницата
                // Селектор по XPath: page.click('//input[@type="submit"]')
            ]);
            
            //Assert that the response is okey:
            await expect(response.ok()).toBeTruthy();
            //Parse the response to JSON
            let userData = await response.json();
    
            //Assert that the email and password are as expected
            expect(userData.email).toBe(user.email);
            expect(userData.password).toEqual(user.password);
            
        })

        test('register does not work with empty fields', async () => {
            //arrange
            await page.goto(host);

            //act
            await page.click('text=Register');
            await page.click('[type="submit"]');

            //assert
            expect(page.url()).toBe(host+'/register');
        })

        test('login makes correct API calls', async () => {
            //arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector("form");

            //act
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            let userData = await response.json();

            //assert
            expect(response.ok()).toBeTruthy();
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);






        })

        test('login does not work with empty fields', async () => {
            //arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector("form");

            //act
            await page.click('[type="submit"]');

            //assert
            expect(page.url()).toBe(host + '/login');


        })

        test('logout makes correct API call', async () =>{
            //arrange
            await page.goto(host);
            await page.click('text=Login');
            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            await page.click('[type="submit"]');

           //act 
           let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() === 204),
                page.click('text=Logout')
           ])
           await page.waitForSelector('text=Login');

           //assert
           expect(response.ok).toBeTruthy();
           expect(page.url()).toBe(host + '/');



        })



    })

    describe('navigation bar', () => {
        test('logged user should see correct navigation buttons', async () =>{
            //arrange
            await page.goto(host);
            //act
            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator('#login-password').fill(user.password);
            await page.click('[type="submit"]');

            //assert
            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeVisible();
            await expect(page.locator('nav >> text=logout')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();

        })

        test('guest user should see correct navigation buttons', async () =>{
            //act
            await page.goto(host);            

            //assert
            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeHidden();
            await expect(page.locator('nav >> text=logout')).toBeHidden();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();

        })



    })

    describe('CRUD', () => {
        beforeEach(async () => {
            await page.goto(host);

            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator('#email').fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]');
        });

        test('create does not work with empty fields', async ()=> {
            //arrange
            await page.click("text=Create Game");
            await page.waitForSelector('form');

            //act
            await page.click('[type="submit"]');

            //assert
            expect(page.url()).toBe(host + "/create");
        })

        test('create makes correct API call for logged user', async () => {
            //arrange
            await page.click("text=Create Game");
            await page.waitForSelector('form');
            
            //act
            await page.fill('[name="title"]', game.title); 
            await page.fill('[name="category"]', game.category); 
            await page.fill('[name="maxLevel"]', game.maxLevel); 
            await page.fill('[name="imageUrl"]', game.imageUrl); 
            await page.fill('[name="summary"]', game.summary);
            
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/games') && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            let gameData = await response.json();

            //assert
            await expect(response.ok).toBeTruthy();
            expect(gameData.title).toEqual(game.title);
            expect(gameData.category).toEqual(game.category);
            expect(gameData.maxLevel).toEqual(game.maxLevel);
            expect(gameData.imageUrl).toEqual(game.imageUrl);
            expect(gameData.summary).toEqual(game.summary);
        })

        test('details show eidt/delete buttons for owner', async () => {
            //arrange
            await page.goto(host + '/catalog');

            //act
            await page.click(`.allGames .allGames-info:has-text("Random Title") .details-button`);

            //assert
            await expect(page.locator('text="Delete"')).toBeVisible();
            await expect(page.locator('text="Edit"')).toBeVisible();
        })

        test('non-owner does not see edit/deete buttons', async () => {
            //arrange
            await page.goto(host + '/catalog');

            //act
            await page.click(`.allGames .allGames-info:has-text("Minecraft") .details-button`);

            //assert
            await expect(page.locator('text="Delete"')).toBeHidden();
            await expect(page.locator('text="Edit"')).toBeHidden();
        })

        test('edit makes correct API call', async () =>{
            //arrange
            await page.goto(host + "/catalog");
            await page.click(`.allGames .allGames-info:has-text("Random Title") .details-button`);
            await page.click('text=Edit');

            //act
            await page.locator('[name="title"]').fill("Edited title");
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/games') && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            let gameData = await response.json();

            //assert
            await expect(response.ok).toBeTruthy();
            expect(gameData.title).toEqual("Edited title");
            expect(gameData.category).toEqual(game.category);
            expect(gameData.maxLevel).toEqual(game.maxLevel);
            expect(gameData.summary).toEqual(game.summary);

        })

        test('delete makes correct API call', async ()=> {
            //arrange
            await page.goto(host + "/catalog");
            await page.click(`.allGames .allGames-info:has-text("Edited title") .details-button`);
            
            //act
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/games') && response.status() === 200),
                page.click('text=Delete')
            ]);
            
            //assert
            expect(response.ok).toBeTruthy();

        })
   

    })

    describe('Home page', ()=>{
        test('Home page has correct data', async ()=> {
            //arrange
            await page.goto(host);

            //assert
            await expect(page.locator(".welcome-message h2")).toHaveText("ALL new games are");
            await expect(page.locator(".welcome-message h3")).toHaveText("Only in GamesPlay");
            await expect(page.locator("#home-page h1")).toHaveText("Latest Games");

            const games = await page.locator('#home-page .game').all();
            //expect(games.length).toEqual(4);
            expect(games.length).toBeGreaterThanOrEqual(3);
        })
    })

    //TODO - Other TESTS N:9** - Make Better Test Coverage



})






























/* THIS IS THE SOLUTION
const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    catalog: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    allGames: '/data/games?sortBy=_createdOn%20desc',
    create: '/data/games',
    details: (id) => `/data/games/${id}`,
    delete: (id) => `/data/games/${id}`,
    comments: (id) => `/data/comments?where=gameId%3D%22${id}%22`,
    postComments: '/data/comments'
};

let browser;
let context;
let page;

let user = {
    email : "",
    password : "123456",
    confirmPass : "123456",
};

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
        test("register does not work with empty fields", async () => {
            await page.goto(host);
            await page.click('text=Register');

            await page.click('[type="submit"]');

            //await page.on("dialog", dialog => dialog.accept());

            expect(page.url()).toBe(host + '/register');
        });

        test("register makes correct API call", async () => {
            await page.goto(host);
            await page.click('text=Register');

            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 1000);
            user.email = `abv_${random}@abv.bg`;
            
            
            await page.locator("#email").fill(user.email);
            await page.locator("#register-password").fill(user.password);
            await page.locator("#confirm-password").fill(user.confirmPass);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            
            await expect(response.ok()).toBeTruthy();
            let userData = await response.json();

            expect(userData.email).toBe(user.email);
            expect(userData.password).toEqual(user.password);
        });

        test("login does not work with empty fields", async () => {
            await page.goto(host);
            await page.click('text=Login');

            await page.click('[type="submit"]');

            expect(page.url()).toBe(host + '/login');
        });

        test("login makes correct API call", async () => {
            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');
            
            
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/login") && response.status() === 200),
                page.click('[type="submit"]')
            ]);
            
            expect(response.ok()).toBeTruthy();
            let userData = await response.json();
            //console.log(userData);
            expect(userData.email).toBe(user.email);
            expect(userData.password).toEqual(user.password);
        });

        test('logout makes correct API call', async () => {
            await page.goto(host);
            await page.click('text=Login');

            await page.waitForSelector('form');
            
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/logout") && response.status() === 204),
                page.locator('nav >> text=Logout').click()
            ]);
            expect(response.ok).toBeTruthy();
            await page.waitForSelector('nav >> text=Login');

            expect(page.url()).toBe(host + "/");
        });
    })

    describe("navbar", () => {
        test('logged user should see correct navigation', async () => {
            await page.goto(host);

            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]')

            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        });

        test('guest user should see correct navigation', async () => {
            await page.goto(host);

            await expect(page.locator('nav >> text=All games')).toBeVisible();
            await expect(page.locator('nav >> text=Create Game')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();
        });
    });

    describe("CRUD", () => {
        beforeEach(async () => {
            await page.goto(host);

            await page.click('text=Login');
            await page.waitForSelector('form');
            await page.locator("#email").fill(user.email);
            await page.locator("#login-password").fill(user.password);
            await page.click('[type="submit"]')
        });

        test('create does NOT work with empty fields', async () => {

            await page.click('text=Create Game');
            await page.waitForSelector('form');
            await page.click('[type="submit"]');

            expect(page.url()).toBe(host + '/create');
        });

        test('create makes correct API call for logged in user', async () => {
            await page.click('text=Create Game');
            await page.waitForSelector('form');

            await page.fill('[name="title"]', "Random title");
            await page.fill('[name="category"]', "Random category");
            await page.fill('[name="maxLevel"]', "12");
            await page.fill('[name="imageUrl"]', "https://jpeg.org/images/jpeg-home.jpg");
            await page.fill('[name="summary"]', "Random summary...");

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            await expect(response.ok()).toBeTruthy();
            let gameData = await response.json();
            
            expect(gameData.title).toEqual('Random title');
            expect(gameData.category).toEqual('Random category');
            expect(gameData.maxLevel).toEqual('12');
            expect(gameData.summary).toEqual('Random summary...');
        });

        
        test('details show edit/delete buttons for owner', async () => {
            await page.goto(host + "/catalog");

            await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);

            await expect(page.locator('text="Delete"')).toBeVisible();
            await expect(page.locator('text="Edit"')).toBeVisible();
        });

        test('non-owner does NOT see delete and edit buttons', async () => {
            await page.goto(host + "/catalog");
            await page.click(`.allGames .allGames-info:has-text("MineCraft") >> .details-button`);

            await expect(page.locator('text="Delete"')).toBeHidden();
            await expect(page.locator('text="Edit"')).toBeHidden();
        });

        test('edit makes correct API call', async () => {
            await page.goto(host + "/catalog");

            await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);
            await page.click('text=Edit');

            await page.waitForSelector('form');

            await page.locator('[name="title"]').fill( 'Random title_edit');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
                page.click('[type="submit"]')
            ]);

            let gameData = await response.json()
            
            expect(gameData.title).toEqual('Random title_edit');
            expect(gameData.category).toEqual('Random category');
            expect(gameData.maxLevel).toEqual('12');
            expect(gameData.summary).toEqual('Random summary...');
        });

        test('delete makes correct API call for owner', async () => {
            await page.goto(host + "/catalog");

            await page.click(`.allGames .allGames-info:has-text("Random title") .details-button`);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/data/games") && response.status() === 200),
                await page.click('text=Delete')
            ]);

            expect(response.ok()).toBeTruthy();
        });
    })

    describe('Home Page', () => {

        test('show home page', async () => {
            
            await page.goto(host);

            expect(page.locator('.welcome-message h2')).toHaveText("ALL new games are");
            expect(page.locator('.welcome-message h3')).toHaveText("Only in GamesPlay");
            expect(page.locator('#home-page h1')).toHaveText("Latest Games");
            
            const gameDivs = await page.locator('#home-page .game').all();
            
            expect(gameDivs.length).toBeGreaterThanOrEqual(3);
        });
    });
})

 */