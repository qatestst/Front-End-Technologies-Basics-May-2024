QUnit.config.reorder = false;

const baseUrl = 'http://localhost:3030/';

let user = {
    email: "",
    password: "123456"
}

let token = '';
let userId = '';

let eventData = {
        author: "",
        date: "24.06.2024",
        title: "",
        description: "",
        imageUrl: "/images/2.png"
}

let lastCreatedId;
let lastEditedId;

QUnit.module('Test user functionalities', ()=>{
    QUnit.test('Register user with valid data', async (assert) =>{
        //arrange    
        let path = 'users/register';
        let random = Math.floor(Math.random() * 10000);
        let email = `abv${random}@abv.bg`;
        user.email = email;

        //act
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json' 
            },
            body: JSON.stringify(user)
        });

        assert.ok(response.ok);
        let json = await response.json();
        console.log(json);
       

        assert.ok(json.hasOwnProperty('accessToken'), 'Response has property "accessToken".');

        assert.ok(json.hasOwnProperty('email'), 'Response has property "email".');
        assert.equal(json['email'], user.email, 'Expected email');
        assert.strictEqual(typeof json['email'], 'string', 'Email is string')

        assert.ok(json.hasOwnProperty('password'), 'Response has property "password".');
        assert.equal(json['password'], user.password, 'Expected password');
        assert.strictEqual(typeof json['password'], 'string', 'Password is string')

        assert.ok(json.hasOwnProperty('_createdOn'), 'Response has property "_createdOn".');
        assert.strictEqual(typeof json['_createdOn'], 'number', 'property "_createdOn" is number')

        assert.ok(json.hasOwnProperty('_id'), 'Response has property "_id".');
        assert.strictEqual(typeof json['_id'], 'string', 'Response property "_id" is string')

        token = json['accessToken'];
        userId = json['_id'];

        sessionStorage.setItem('event-user', JSON.stringify(user));

    })

    QUnit.test('Test valid user login', async (assert) =>{
        path = 'users/login';
        let email = user.email;
        let password = user.password;

        let response = await fetch(baseUrl + path,  {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        assert.ok(response.ok);
        let json = await response.json();
        console.log(json);

        assert.ok(json.hasOwnProperty('accessToken'), 'Response has property "accessToken".');

        assert.ok(json.hasOwnProperty('email'), 'Response has property "email".');
        assert.equal(json['email'], user.email, 'Expected email');
        assert.strictEqual(typeof json['email'], 'string', 'Email is string')

        assert.ok(json.hasOwnProperty('password'), 'Response has property "password".');
        assert.equal(json['password'], user.password, 'Expected password');
        assert.strictEqual(typeof json['password'], 'string', 'Password is string')

        assert.ok(json.hasOwnProperty('_createdOn'), 'Response has property "_createdOn".');
        assert.strictEqual(typeof json['_createdOn'], 'number', 'property "_createdOn" is number')

        assert.ok(json.hasOwnProperty('_id'), 'Response has property "_id".');
        assert.strictEqual(typeof json['_id'], 'string', 'Response property "_id" is string')

        token = json['accessToken'];
        userId = json['_id'];

        sessionStorage.setItem('event-user', JSON.stringify(user));

    })
})

QUnit.module('Test Event functionality', ()=>{
    QUnit.test('Get all Events', async (assert)=>{
        let path = 'data/theaters';
        let queryParam = '?sortBy=_createdOn%20desc&distinct=title';

        let response = await fetch(baseUrl + path + queryParam, {
            method: 'GET'
        });

        assert.ok(response.ok, 'Resposne is OK')
        let json = await response.json();
        console.log(json);

        assert.ok(Array.isArray(json), 'Response is an Array');

        json.forEach( event => { 
            assert.ok(event.hasOwnProperty('author'), 'Event has property "author"');
            assert.strictEqual(typeof event['author'], 'string', 'Event property "author is string"');

            assert.ok(event.hasOwnProperty('date'), 'Event has property "date"');
            assert.strictEqual(typeof event['date'], 'string', 'Event property "date is string"');

            assert.ok(event.hasOwnProperty('description'), 'Event has property "description"');
            assert.strictEqual(typeof event['description'], 'string', 'Event property "description is string"');

            assert.ok(event.hasOwnProperty('imageUrl'), 'Event has property "imageUrl"');
            assert.strictEqual(typeof event['imageUrl'], 'string', 'Event property "imageUrl" is string"');

            assert.ok(event.hasOwnProperty('title'), 'Event has property "title"');
            assert.strictEqual(typeof event['title'], 'string', 'Event property "title" is string"');

            assert.ok(event.hasOwnProperty('_createdOn'), 'Event has property "_createdOn"');
            assert.strictEqual(typeof event['_createdOn'], 'number', 'Event property "_createdOn" is number"');

            assert.ok(event.hasOwnProperty('_id'), 'Event has property "_id"');
            assert.strictEqual(typeof event['_id'], 'string', 'Event property "_id" is string"');

            assert.ok(event.hasOwnProperty('_ownerId'), 'Event has property "_ownerId"');
            assert.strictEqual(typeof event['_ownerId'], 'string', 'Event property "_ownerId" is string"');
            
        });

    });

    QUnit.test('Create Event', async (assert)=>{
        path = 'data/theaters';
        let random = Math.floor(Math.random() * 10000);
        eventData.title = `Random title ${random}`;
        eventData.author = `Random author ${random}`;
        eventData.author = `Random description ${random}`;
        
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(eventData)
        });

        assert.ok(response.ok, 'Resposne is OK')
        let json = await response.json();
        console.log(json);

            assert.ok(json.hasOwnProperty('author'), 'Event has property "author"');
            assert.strictEqual(typeof json['author'], 'string', 'Event property "author is string"');
            assert.equal(json['author'], eventData.author, 'Expected author');
            // the same is the same
            //assert.equal(json.author, eventData.author, 'Expected author');

            assert.ok(json.hasOwnProperty('date'), 'Event has property "date"');
            assert.strictEqual(typeof json['date'], 'string', 'Event property "date is string"');
            assert.equal(json['date'], eventData.date, 'Expected date');

            assert.ok(json.hasOwnProperty('description'), 'Event has property "description"');
            assert.strictEqual(typeof json['description'], 'string', 'Event property "description is string"');
            assert.equal(json['description'], eventData.description, 'Expected description');

            assert.ok(json.hasOwnProperty('imageUrl'), 'Event has property "imageUrl"');
            assert.strictEqual(typeof json['imageUrl'], 'string', 'Event property "imageUrl" is string"');
            assert.equal(json['imageUrl'], eventData.imageUrl, 'Expected imageUrl');

            assert.ok(json.hasOwnProperty('title'), 'Event has property "title"');
            assert.strictEqual(typeof json['title'], 'string', 'Event property "title" is string"');
            assert.equal(json['title'], eventData.title, 'Expected title'); // the same as: assert.equal(json.title, eventData.title, 'Expected title');
            

            assert.ok(json.hasOwnProperty('_createdOn'), 'Event has property "_createdOn"');
            assert.strictEqual(typeof json['_createdOn'], 'number', 'Event property "_createdOn" is number"');

            assert.ok(json.hasOwnProperty('_id'), 'Event has property "_id"');
            assert.strictEqual(typeof json['_id'], 'string', 'Event property "_id" is string"');

            assert.ok(json.hasOwnProperty('_ownerId'), 'Event has property "_ownerId"');
            assert.strictEqual(typeof json['_ownerId'], 'string', 'Event property "_ownerId" is string"');

            lastCreatedId = json._id;
             
    });

    QUnit.test('Edit Event', async (assert)=>{
        //arrange
        let path = 'data/theaters';
        let random = Math.floor(Math.random() * 10000);

        eventData.title =`Edited Random title ${random}`;

        //act
        let response = await fetch(baseUrl + path +`/${lastCreatedId}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json',
                'X-Authorization' : token
            },
            body: JSON.stringify(eventData)
        });

        let json = await response.json();
        // assert
        assert.ok(json.hasOwnProperty('author'), 'Event has property "author"');
            assert.strictEqual(typeof json['author'], 'string', 'Event property "author is string"');
            assert.equal(json['author'], eventData.author, 'Expected author');
            // the same is the same
            //assert.equal(json.author, eventData.author, 'Expected author');

            assert.ok(json.hasOwnProperty('date'), 'Event has property "date"');
            assert.strictEqual(typeof json['date'], 'string', 'Event property "date is string"');
            assert.equal(json['date'], eventData.date, 'Expected date');

            assert.ok(json.hasOwnProperty('description'), 'Event has property "description"');
            assert.strictEqual(typeof json['description'], 'string', 'Event property "description is string"');
            assert.equal(json['description'], eventData.description, 'Expected description');

            assert.ok(json.hasOwnProperty('imageUrl'), 'Event has property "imageUrl"');
            assert.strictEqual(typeof json['imageUrl'], 'string', 'Event property "imageUrl" is string"');
            assert.equal(json['imageUrl'], eventData.imageUrl, 'Expected imageUrl');

            assert.ok(json.hasOwnProperty('title'), 'Event has property "title"');
            assert.strictEqual(typeof json['title'], 'string', 'Event property "title" is string"');
            assert.equal(json['title'], eventData.title, 'Expected title'); // the same as: assert.equal(json.title, eventData.title, 'Expected title');
            

            assert.ok(json.hasOwnProperty('_createdOn'), 'Event has property "_createdOn"');
            assert.strictEqual(typeof json['_createdOn'], 'number', 'Event property "_createdOn" is number"');

            assert.ok(json.hasOwnProperty('_id'), 'Event has property "_id"');
            assert.strictEqual(typeof json['_id'], 'string', 'Event property "_id" is string"');

            assert.ok(json.hasOwnProperty('_ownerId'), 'Event has property "_ownerId"');
            assert.strictEqual(typeof json['_ownerId'], 'string', 'Event property "_ownerId" is string"');

            lastEditedId = json._id;

    });

    QUnit.test('Delete Event', async (assert)=>{
        let path = 'data/theaters';

        let response = await fetch(baseUrl + path + `/${lastEditedId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization' : token
            }
        });

        //assert
        assert.ok(response.ok)

    });



})