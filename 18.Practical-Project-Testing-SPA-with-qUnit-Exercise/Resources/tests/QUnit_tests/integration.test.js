// My CODE 

const baseUrl = 'http://localhost:3030/';
let user = {
    email: '',
    password: '123456'
}

let game = {
    title: "",
    category: "",
    maxLevel: "71",
    imageUrl: "./images/Zombielang.png",
    summary: ""
}

let lastCreatedGameId = "";

let token = "";
let userId = "";

QUnit.config.reorder = false; //QUnit will run the tests in the order they are written.

QUnit.module("User functionalities", () => {
    QUnit.test("Registration", async (assert) => {
        let path = 'users/register';

        let random = Math.floor(Math.random() * 10000)
        let email = `abv${random}@abv.bg`;

        user.email = email;

        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : { 
                'content-type' : 'application/json'
             },
            body : JSON.stringify(user)
        });

        assert.ok(response.ok, "successful response");
        let json = await response.json();

        assert.ok(json.hasOwnProperty('email'), 'email exists');
        assert.equal(json['email'], user.email, 'expected email');
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');

        assert.ok(json.hasOwnProperty('password'), 'password exists');
        assert.equal(json['password'], user.password, 'expected password');
        assert.strictEqual(typeof json.password, 'string', 'Property "password" is a string');

        assert.ok(json.hasOwnProperty('accessToken'), 'accessToken exists');
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');

        assert.ok(json.hasOwnProperty('_id'), '_id exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        token = json['accessToken']; // get token 
        userId = json['_id']; // get user id
        sessionStorage.setItem('game-user', JSON.stringify(user)); // set token session store in browser
        // We need user information in session storage because our SPA application uses it for user authentication
    });

    QUnit.test('Login', async (assert) =>{
        let path = 'users/login';
        let response = await fetch(baseUrl+path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();

        assert.ok(json.hasOwnProperty('email'), 'email exists');
        assert.equal(json['email'], user.email, "expected email");
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');

        assert.ok(json.hasOwnProperty('password'), "passwword exists");
        assert.equal(json['password'], user.password, "expected password");
        assert.strictEqual(typeof json.password, 'string' , 'Property "password" is a string');

        assert.ok(json.hasOwnProperty('accessToken'), 'accessToken exists');
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string')

        assert.ok(json.hasOwnProperty('_id'), '_id exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        userId = json['_id']; //get is
        token = json['accessToken']; //get access token
        sessionStorage.setItem('game-user', JSON.stringify(user)); //set token to session store in browser
    })

})

QUnit.module('Games finctionalities', ()=>{
    QUnit.test('Get All Games', async (assert) =>{
        //Arrange
        const path = 'data/games';
        const queryParams = '?sortBy=_createdOn%20desc';
        //Act
        let response = await fetch(baseUrl + path + queryParams);
        let json = await response.json();

        assert.ok(response.ok, 'response successful');
        assert.ok(Array.isArray(json), 'Response is an Array'); // Assert that response is Array ot java script objects - [{object1},{object2},{object3}..{object n}]
        
        json.forEach(jsonObject => {
            assert.ok(jsonObject.hasOwnProperty('category'), 'Property exists');
            assert.ok((typeof jsonObject.category, 'string'), 'Property "category" is "string"');

            assert.ok(jsonObject.hasOwnProperty('imageUrl'),'Property exists');
            assert.ok((typeof jsonObject.imageUrl, 'string'), 'Property "imageUrl" is "string"');

            assert.ok(jsonObject.hasOwnProperty('title', 'Property exists'));
            assert.ok((typeof jsonObject.title, 'string'), 'Property "title" is "string"');

            assert.ok(jsonObject.hasOwnProperty('maxLevel'), 'Property exists');
            assert.ok((typeof jsonObject.maxLevel, 'string'), 'Property "maxLevel" is "string"');

            assert.ok(jsonObject.hasOwnProperty('summary'), 'Property exists');
            assert.ok((typeof jsonObject.summary, 'string'), 'Property "summary" is "string"');

            assert.ok(jsonObject.hasOwnProperty('_id'), 'Property exists');
            assert.ok((typeof jsonObject._id, 'string'), 'Property "_id" is "string"');

           
            






            

        });

        
    })

    QUnit.test('Create game', async (assert) => {
        let path = 'data/games';
        let random = Math.floor(Math.random() * 10000);
        game.title = `Random title ${random}`;
        game.category = `Random category ${random}`;
        game.summary = `Random summary ${random}`;


        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization' : token,
            },
            body: JSON.stringify(game)
        })

        assert.ok(response.ok, 'Response is successful');

        let json = await response.json();

        lastCreatedGameId = json._id;

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId,'string', 'Property "_ownerId" is string');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.equal(json.title, game.title, 'property "title" has expected data')
        assert.strictEqual(typeof json.title,'string', 'Property "title" is string');

        assert.ok(json.hasOwnProperty('category'), 'Property "category" exists');
        assert.equal(json.category, game.category, 'property "category" has expected data')
        assert.strictEqual(typeof json.category,'string', 'category "_ownerId" is string');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
        assert.equal(json.maxLevel, game.maxLevel, 'Property "maxLevel" value is as expected')
        assert.strictEqual(typeof json.maxLevel,'string', 'Property "maxLevel" is string');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.equal(json.imageUrl, game.imageUrl, 'Property "imageUrl" value is as expected')
        assert.strictEqual(typeof json.imageUrl,'string', 'Property "maxLevel" is string');

        assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
        assert.equal(json.summary, game.summary, 'Property "summary" has correct data')
        assert.strictEqual(typeof json.summary,'string', 'Property "summary" is string');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_ceratedOn" exists');
        assert.strictEqual(typeof json._createdOn,'number', 'Property "_createdOn" is number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id,'string', 'Property "_id" is string');

    })

    QUnit.test('Get game by "_id" functionality', async (assert) => {
        let path = 'data/games/';

        let response = await fetch(baseUrl + path + lastCreatedGameId);
        let json = await response.json();

        assert.ok(response.ok, 'Response is successful');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId,'string', 'Property "_ownerId" is string');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.equal(json.title, game.title, 'property "title" has expected data')
        assert.strictEqual(typeof json.title,'string', 'Property "title" is string');

        assert.ok(json.hasOwnProperty('category'), 'Property "category" exists');
        assert.equal(json.category, game.category, 'property "category" has expected data')
        assert.strictEqual(typeof json.category,'string', 'category "_ownerId" is string');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
        assert.equal(json.maxLevel, game.maxLevel, 'Property "maxLevel" value is as expected')
        assert.strictEqual(typeof json.maxLevel,'string', 'Property "maxLevel" is string');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.equal(json.imageUrl, game.imageUrl, 'Property "imageUrl" value is as expected')
        assert.strictEqual(typeof json.imageUrl,'string', 'Property "maxLevel" is string');

        assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
        assert.equal(json.summary, game.summary, 'Property "summary" has correct data')
        assert.strictEqual(typeof json.summary,'string', 'Property "summary" is string');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_ceratedOn" exists');
        assert.strictEqual(typeof json._createdOn,'number', 'Property "_createdOn" is number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id,'string', 'Property "_id" is string');

    })

    QUnit.test('Edit game functionality', async (assert) => {
        let path = 'data/games/';

        let random = Math.floor(Math.random() * 10000);
        game = {
            title: `Edited title + ${random}`,
            category: `Edited category + ${random}`,
            maxLevel: '50',
            imageUrl: './images/avatar-1.jpg',
            summary: `Edited summary + ${random}`,
        };

        let response = await fetch(baseUrl + path + lastCreatedGameId, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(game)
        })

        let json = await response.json();

        assert.ok(response.ok, 'Response is successful');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId,'string', 'Property "_ownerId" is string');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.equal(json.title, game.title, 'property "title" has expected data')
        assert.strictEqual(typeof json.title,'string', 'Property "title" is string');

        assert.ok(json.hasOwnProperty('category'), 'Property "category" exists');
        assert.equal(json.category, game.category, 'property "category" has expected data')
        assert.strictEqual(typeof json.category,'string', 'category "_ownerId" is string');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
        assert.equal(json.maxLevel, game.maxLevel, 'Property "maxLevel" value is as expected')
        assert.strictEqual(typeof json.maxLevel,'string', 'Property "maxLevel" is string');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.equal(json.imageUrl, game.imageUrl, 'Property "imageUrl" value is as expected')
        assert.strictEqual(typeof json.imageUrl,'string', 'Property "maxLevel" is string');

        assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
        assert.equal(json.summary, game.summary, 'Property "summary" has correct data')
        assert.strictEqual(typeof json.summary,'string', 'Property "summary" is string');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_ceratedOn" exists');
        assert.strictEqual(typeof json._createdOn,'number', 'Property "_createdOn" is number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id,'string', 'Property "_id" is string');
    })

    QUnit.test('Delete game functionality', async (assert) => {
        let path = 'data/games/';
        let response = await fetch(baseUrl + path + lastCreatedGameId, {
            method: 'DELETE',
            headers: {
                'X-Authorization' : token
            },
            body: JSON.stringify(game)
        });

        let json = await response.json();

        assert.ok(response.ok, 'Response is successful');

        assert.ok(json.hasOwnProperty('_deletedOn'), 'Response has property "_deletedOn"')
        assert.strictEqual(typeof json._deletedOn, 'number', 'property "_deletedOn" is a number ');
        
    })

    QUnit.test("newly created game - no comments (empty array)", async (assert) => {
        let path = 'data/comments';
        
        //create new game and get Id:
        let gameId = (await fetch(baseUrl + 'data/games', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(game)
        })
        .then(response => response.json()))._id;

        gameIdForComments = gameId;

        let queryParams = `?where=gameId%3D%22${gameId}%22`;

        let response = await fetch(baseUrl + path + queryParams)

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(Array.isArray(json), "response is array");
        assert.ok(json.length === 0, "array is empty");
    });

    QUnit.test("post new comment", async (assert) => {
        let path = 'data/comments';

        let random =  Math.floor(Math.random() * 1000);

        let comment = {
            gameId : gameIdForComments,
            comment  : `comment value`
        };

        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(comment)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(json.hasOwnProperty('comment'), 'Property "comment" exists');
        assert.strictEqual(typeof json.comment, 'string', 'Property "comment" is a string');
        assert.strictEqual(json.comment, comment.comment, 'Property "comment" has the correct value');

        assert.ok(json.hasOwnProperty('gameId'), 'Property "gameId" exists');
        assert.strictEqual(typeof json.gameId, 'string', 'Property "gameId" is a string');
        assert.strictEqual(json.gameId, comment.gameId, 'Property "gameId" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');
    });

    QUnit.test("get comments for specific game", async (assert) => {
        let path = 'data/comments';
        
        let queryParams = `?where=gameId%3D%22${gameIdForComments}%22`;

        let response = await fetch(baseUrl + path + queryParams)

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(Array.isArray(json), "Response should be an array");

        json.forEach(comment => {
            assert.ok(comment.hasOwnProperty('_ownerId'), "Comment should have _ownerId property");
            assert.strictEqual(typeof comment._ownerId, "string", "_ownerId should be a string");
           
            assert.ok(comment.hasOwnProperty('gameId'), "Comment should have gameId property");
            assert.strictEqual(typeof comment.gameId, "string", "gameId should be a string");
            
            assert.ok(comment.hasOwnProperty('comment'), "Comment should have comment property");
            assert.strictEqual(typeof comment.comment, "string", "comment should be a string");

            assert.ok(comment.hasOwnProperty('_createdOn'), "Comment should have _createdOn property");
            assert.strictEqual(typeof comment._createdOn, "number", "_createdOn should be a number");
                
            assert.ok(comment.hasOwnProperty('_id'), "Comment should have _id property");
            assert.strictEqual(typeof comment._id, "string", "_id should be a string");
            
        })
    });

    
    
})






























// SOLUTION:
/* const baseUrl = 'http://localhost:3030/';

let user = {
    email : "",
    password : "123456"
};

let token = "";
let userId = "";

let lastCreatedGameId = "";
let game = {
    title : "",
    category : "",
    maxLevel : "71",
    imageUrl : "./images/ZombieLang.png",
    summary : ""
};

let gameIdForComments = "";

QUnit.config.reorder = false;

QUnit.module("user functionalities", () => {
    QUnit.test("registration", async (assert) => {
        let path = 'users/register';

        let random = Math.floor(Math.random() * 10000)
        let email = `abv${random}@abv.bg`;

        user.email = email;

        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : { 
                'content-type' : 'application/json'
             },
            body : JSON.stringify(user)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(json.hasOwnProperty('email'), "email exist");
        assert.equal(json['email'], user.email, "expected mail");
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');

        assert.ok(json.hasOwnProperty('password'), "password exist");
        assert.equal(json['password'], user.password, "expected password");
        assert.strictEqual(typeof json.password, 'string', 'Property "password" is a string');

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exist");
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');
        
        assert.ok(json.hasOwnProperty('_id'), "id exist"); //check for id
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        token = json['accessToken']; //get token
        userId = json['_id']; //get id
        sessionStorage.setItem('game-user', JSON.stringify(user)); //set token to session store in browser
    });

    QUnit.test("login", async (assert) => {
        let path = 'users/login';

        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : { 
                'content-type' : 'application/json'
             },
            body : JSON.stringify(user)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(json.hasOwnProperty('email'), "email exist");
        assert.equal(json['email'], user.email, "expected mail");
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');

        assert.ok(json.hasOwnProperty('password'), "password exist");
        assert.equal(json['password'], user.password, "expected password");
        assert.strictEqual(typeof json.password, 'string', 'Property "password" is a string');

        assert.ok(json.hasOwnProperty('accessToken'), "accessToken exist");
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');

        assert.ok(json.hasOwnProperty('_id'), "id exist");
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        userId = json['_id']; //get id
        token = json['accessToken']; //get token
        sessionStorage.setItem('game-user', JSON.stringify(user)); //set token to session store in browser
    });
});

QUnit.module("games functionalities", () => {
    QUnit.test("get all games", async (assert) => {
        let path = 'data/games';
        let queryParam = '?sortBy=_createdOn%20desc'; //will sort all games in descending order - help for games order prediction
        
        let response = await fetch(baseUrl + path + queryParam);

        assert.ok(response.ok, "successful response");

        let json = await response.json();

        assert.ok(Array.isArray(json), "response is array");

        json.forEach(jsonData => {
            assert.ok(jsonData.hasOwnProperty('category'), 'Property "category" exists');
            assert.strictEqual(typeof jsonData.category, 'string', 'Property "category" is a string');

            assert.ok(jsonData.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
            assert.strictEqual(typeof jsonData.imageUrl, 'string', 'Property "imageUrl" is a string');

            assert.ok(jsonData.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
            assert.strictEqual(typeof jsonData.maxLevel, 'string', 'Property "maxLevel" is a string');

            assert.ok(jsonData.hasOwnProperty('title'), 'Property "title" exists');
            assert.strictEqual(typeof jsonData.title, 'string', 'Property "title" is a string');

            assert.ok(jsonData.hasOwnProperty('summary'), 'Property "summary" exists');
            assert.strictEqual(typeof jsonData.summary, 'string', 'Property "summary" is a string');

            assert.ok(jsonData.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
            assert.strictEqual(typeof jsonData._createdOn, 'number', 'Property "_createdOn" is a number');

            assert.ok(jsonData.hasOwnProperty('_id'), 'Property "_id" exists');
            assert.strictEqual(typeof jsonData._id, 'string', 'Property "_id" is a string');

            assert.ok(jsonData.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
            assert.strictEqual(typeof jsonData._ownerId, 'string', 'Property "_ownerId" is a string');
        });
    });

    QUnit.test("create game", async (assert) => {
        let path = 'data/games';

        let random = Math.floor(Math.random() * 100000);

        game.title = `Random game title_${random}`;
        game.category = `Category ${random}`;
        game.summary = `Short random summery of ${game.title}`;

        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(game)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(json.hasOwnProperty('category'), 'Property "category" exists');
        assert.strictEqual(typeof json.category, 'string', 'Property "category" is a string');
        assert.strictEqual(json.category, game.category, 'Property "category" has the correct value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
        assert.strictEqual(json.imageUrl, game.imageUrl, 'Property "imageUrl" has the correct value');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
        assert.strictEqual(typeof json.maxLevel, 'string', 'Property "maxLevel" is a string');
        assert.strictEqual(json.maxLevel, game.maxLevel, 'Property "maxLevel" has the correct value');

        assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
        assert.strictEqual(typeof json.summary, 'string', 'Property "summary" is a string');
        assert.strictEqual(json.summary, game.summary, 'Property "summary" has the correct value');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
        assert.strictEqual(json.title, game.title, 'Property "title" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        lastCreatedGameId = json._id;

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    });

    QUnit.test("get by id", async (assert) => {
        let path = 'data/games';

        let response = await fetch(baseUrl + path + `/${lastCreatedGameId}`);

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(json.hasOwnProperty('category'), 'Property "category" exists');
        assert.strictEqual(typeof json.category, 'string', 'Property "category" is a string');
        assert.strictEqual(json.category, game.category, 'Property "category" has the correct value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
        assert.strictEqual(json.imageUrl, game.imageUrl, 'Property "imageUrl" has the correct value');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
        assert.strictEqual(typeof json.maxLevel, 'string', 'Property "maxLevel" is a string');
        assert.strictEqual(json.maxLevel, game.maxLevel, 'Property "maxLevel" has the correct value');

        assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
        assert.strictEqual(typeof json.summary, 'string', 'Property "summary" is a string');
        assert.strictEqual(json.summary, game.summary, 'Property "summary" has the correct value');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
        assert.strictEqual(json.title, game.title, 'Property "title" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');
        assert.strictEqual(json._id, lastCreatedGameId, 'Property "title" has the correct value');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    });

    QUnit.test("edit game", async (assert) => {
        let path = 'data/games';

        let random = Math.floor(Math.random() * 100000);

        game.title = `Edited game title_${random}`;
        game.category = `Edited Category ${random}`;
        game.summary = `Edited short summery of ${game.title}`;

        let response = await fetch(baseUrl + path + `/${lastCreatedGameId}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(game)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(json.hasOwnProperty('category'), 'Property "category" exists');
        assert.strictEqual(typeof json.category, 'string', 'Property "category" is a string');
        assert.strictEqual(json.category, game.category, 'Property "category" has the correct value');

        assert.ok(json.hasOwnProperty('imageUrl'), 'Property "imageUrl" exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'Property "imageUrl" is a string');
        assert.strictEqual(json.imageUrl, game.imageUrl, 'Property "imageUrl" has the correct value');

        assert.ok(json.hasOwnProperty('maxLevel'), 'Property "maxLevel" exists');
        assert.strictEqual(typeof json.maxLevel, 'string', 'Property "maxLevel" is a string');
        assert.strictEqual(json.maxLevel, game.maxLevel, 'Property "maxLevel" has the correct value');

        assert.ok(json.hasOwnProperty('summary'), 'Property "summary" exists');
        assert.strictEqual(typeof json.summary, 'string', 'Property "summary" is a string');
        assert.strictEqual(json.summary, game.summary, 'Property "summary" has the correct value');

        assert.ok(json.hasOwnProperty('title'), 'Property "title" exists');
        assert.strictEqual(typeof json.title, 'string', 'Property "title" is a string');
        assert.strictEqual(json.title, game.title, 'Property "title" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

        lastCreatedGameId = json._id;

        assert.ok(json.hasOwnProperty('_ownerId'), 'Property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property "_ownerId" is a string');
        assert.strictEqual(json._ownerId, userId, 'Property "_ownerId" has the correct value');
    })

    QUnit.test("delete game", async (assert) => {
        let path = 'data/games';

        let random = Math.floor(Math.random() * 100000);

        game.title = `Edited game title_${random}`;
        game.category = `Edited Category ${random}`;
        game.summary = `Edited short summery of ${game.title}`;

        let response = await fetch(baseUrl + path + `/${lastCreatedGameId}`, {
            method : 'DELETE',
            headers : { 'X-Authorization' : token }
        });

        assert.ok(response.ok, "successful response");
    })
});

QUnit.module("comments functionalities", () => {
    QUnit.test("newly created game - no comments (empty array)", async (assert) => {
        let path = 'data/comments';
        
        //create new game and get Id:
        let gameId = (await fetch(baseUrl + 'data/games', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(game)
        })
        .then(response => response.json()))._id;

        gameIdForComments = gameId;

        let queryParams = `?where=gameId%3D%22${gameId}%22`;

        let response = await fetch(baseUrl + path + queryParams)

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(Array.isArray(json), "response is array");
        assert.ok(json.length === 0, "array is empty");
    });

    QUnit.test("post new comment", async (assert) => {
        let path = 'data/comments';

        let random =  Math.floor(Math.random() * 1000);

        let comment = {
            gameId : gameIdForComments,
            comment  : `comment value`
        };

        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body : JSON.stringify(comment)
        });

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(json.hasOwnProperty('comment'), 'Property "comment" exists');
        assert.strictEqual(typeof json.comment, 'string', 'Property "comment" is a string');
        assert.strictEqual(json.comment, comment.comment, 'Property "comment" has the correct value');

        assert.ok(json.hasOwnProperty('gameId'), 'Property "gameId" exists');
        assert.strictEqual(typeof json.gameId, 'string', 'Property "gameId" is a string');
        assert.strictEqual(json.gameId, comment.gameId, 'Property "gameId" has the correct value');

        assert.ok(json.hasOwnProperty('_createdOn'), 'Property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property "_createdOn" is a number');

        assert.ok(json.hasOwnProperty('_id'), 'Property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');
    });

    QUnit.test("get comments for specific game", async (assert) => {
        let path = 'data/comments';
        
        let queryParams = `?where=gameId%3D%22${gameIdForComments}%22`;

        let response = await fetch(baseUrl + path + queryParams)

        assert.ok(response.ok, "successful response");

        let json = await response.json();
        
        assert.ok(Array.isArray(json), "Response should be an array");

        json.forEach(comment => {
            assert.ok(comment.hasOwnProperty('_ownerId'), "Comment should have _ownerId property");
            assert.strictEqual(typeof comment._ownerId, "string", "_ownerId should be a string");
           
            assert.ok(comment.hasOwnProperty('gameId'), "Comment should have gameId property");
            assert.strictEqual(typeof comment.gameId, "string", "gameId should be a string");
            
            assert.ok(comment.hasOwnProperty('comment'), "Comment should have comment property");
            assert.strictEqual(typeof comment.comment, "string", "comment should be a string");

            assert.ok(comment.hasOwnProperty('_createdOn'), "Comment should have _createdOn property");
            assert.strictEqual(typeof comment._createdOn, "number", "_createdOn should be a number");
                
            assert.ok(comment.hasOwnProperty('_id'), "Comment should have _id property");
            assert.strictEqual(typeof comment._id, "string", "_id should be a string");
            
        })
    });
});
 */

