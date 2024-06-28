QUnit.config.reorder = false;
const baseUrl = 'http://localhost:3030/';

let user = {
    username: "",
    email: "",
    password: "123456",
    gender: "male"
};

let userId;
let token;

let lastCreatedMemeId;

QUnit.module('User functionalities', ()=>{
    QUnit.test('User registration', async (assert)=>{
        //arrange
        let random = Math.floor(Math.random() * 10000);
        let randomUsername = `user_${random}`;
        let randomEmail = `random_mail_${random}@mail.bg`;

        user.username = randomUsername;
        user.email = randomEmail;

        let path = 'users/register';
        
        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : { 
                'content-type' : 'application/json'
             },
            body : JSON.stringify(user)
        });
        

        assert.ok(response.ok, "successful response");
        let json = await response.json();
        console.log(json);
       

        assert.ok(json.hasOwnProperty('username'), 'username exists');
        assert.equal(json['username'], user.username, 'expected username');
        assert.strictEqual(typeof json.username, 'string', 'Property "username" is a string');
        assert.ok(json.hasOwnProperty('email'), 'email exists');
        assert.equal(json['email'], user.email, 'expected email');
        assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');
        assert.ok(json.hasOwnProperty('gender'), 'gender exists');
        assert.equal(json['gender'], user.gender, 'expected gender');
        assert.strictEqual(typeof json.gender, 'string', 'Property "gender" is a string');

        assert.ok(json.hasOwnProperty('_id'), '_id exists');
        assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');
 
        assert.ok(json.hasOwnProperty('accessToken'), 'gender exists');
        assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');


        userId = json['_id'];
        token = json['accessToken'];
        sessionStorage.setItem('meme-user', JSON.stringify(user));

        

    });



    QUnit.test('User login', async (assert)=>{
        let path = 'users/login';
        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : { 
                'content-type' : 'application/json'
             },
            body : JSON.stringify({
                email: user.email,
                password: user.password
            })
        });
        

       assert.ok(response.ok, "successful response");
       let json = await response.json();
       console.log(json);

       assert.ok(json.hasOwnProperty('username'), 'username exists');
       assert.equal(json['username'], user.username, 'expected username');
       assert.strictEqual(typeof json.username, 'string', 'Property "username" is a string');
       assert.ok(json.hasOwnProperty('email'), 'email exists');
       assert.equal(json['email'], user.email, 'expected email');
       assert.strictEqual(typeof json.email, 'string', 'Property "email" is a string');
       assert.ok(json.hasOwnProperty('gender'), 'gender exists');
       assert.equal(json['gender'], user.gender, 'expected gender');
       assert.strictEqual(typeof json.gender, 'string', 'Property "gender" is a string');

       assert.ok(json.hasOwnProperty('_id'), '_id exists');
       assert.strictEqual(typeof json._id, 'string', 'Property "_id" is a string');

       assert.ok(json.hasOwnProperty('accessToken'), 'gender exists');
       assert.strictEqual(typeof json.accessToken, 'string', 'Property "accessToken" is a string');
        
        userId = json['_id'];
        token = json['accessToken'];
        sessionStorage.setItem('meme-user', JSON.stringify(user));
                
    });

});

QUnit.module('Meme functionalities', ()=>{
    QUnit.test('Get all Memes', async (assert)=>{
        let path = 'data/memes';
        let queryParam ='?sortBy=_createdOn%20desc';
        let response = await fetch(baseUrl + path + queryParam);        

       assert.ok(response.ok, "successful response");
       let json = await response.json();
       console.log(json);

       assert.ok(Array.isArray(json), 'Response is an Array'); // Assert that response is Array ot java script objects - [{object1},{object2},{object3}..{object n}]

       json.forEach( meme => {
            assert.ok(meme.hasOwnProperty('description'), 'Meme property "desciption" exists'),
            assert.strictEqual(typeof meme.description, 'string', 'Property description is string'),
            
            assert.ok(meme.hasOwnProperty('imageUrl'), 'Meme property "imageUrl" exists'),
            assert.strictEqual(typeof meme.imageUrl, 'string', 'Property imageUrl is string'),

            assert.ok(meme.hasOwnProperty('title'), 'Meme property "title" exists'),
            assert.strictEqual(typeof meme.title, 'string', 'Property title is string'),

            assert.ok(meme.hasOwnProperty('_createdOn'), 'Meme property "_createdOn" exists'),
            assert.strictEqual(typeof meme._createdOn, 'number', 'Property _createdOn is string')
            
            assert.ok(meme.hasOwnProperty('_id'), 'Meme property "_id" exists'),
            assert.strictEqual(typeof meme._id, 'string', 'Property _id is string'),

            assert.ok(meme.hasOwnProperty('_ownerId'), 'Meme property "_ownerId" exists'),
            assert.strictEqual(typeof meme._ownerId, 'string', 'Property _ownerId is string')
                    
       });

    });

    QUnit.test('Create memes', async (assert)=>{
        //arrange
        let path = 'data/meme';
        
        let random = Math.floor(Math.random() * 10000);

        let memeTitle = `Random Title_${random}`;
        let memeDescription = `Random Description ${random}`;

        meme.title = memeTitle;
        meme.description = memeDescription;
        
        //act
        let response = await fetch(baseUrl + path, {
            method : 'POST',
            headers : { 
                'content-type' : 'application/json',
                'X-Authorization' : token
             },
            body : JSON.stringify(meme)
        });
        

        assert.ok(response.ok, "successful response");
        let json = await response.json();
        console.log(json); 

        //assert
            assert.ok(json.hasOwnProperty('description'), 'Meme property "desciption" exists');
            assert.strictEqual(typeof json.description, 'string', 'Property description is string');
            assert.equal(json.description, meme.description, 'Expected description');
            
            assert.ok(json.hasOwnProperty('imageUrl'), 'Meme property "imageUrl" exists');
            assert.strictEqual(typeof json.imageUrl, 'string', 'Property imageUrl is string');
            assert.equal(json.imageUrl, meme.imageUrl, 'Expected imageUrl');

            assert.ok(json.hasOwnProperty('title'), 'Meme property "title" exists');
            assert.strictEqual(typeof json.title, 'string', 'Property title is string');
            assert.equal(json.title, meme.title, 'Expected title');
            
            assert.ok(json.hasOwnProperty('_createdOn'), 'Meme property "_createdOn" exists');
            assert.strictEqual(typeof json._createdOn, 'number', 'Property _createdOn is string');
            
            assert.ok(json.hasOwnProperty('_id'), 'Meme property "_id" exists');
            assert.strictEqual(typeof json._id, 'string', 'Property _id is string');

            assert.ok(json.hasOwnProperty('_ownerId'), 'Meme property "_ownerId" exists');
            assert.strictEqual(typeof json._ownerId, 'string', 'Property _ownerId is string');

            lastCreatedMemeId = json._id;
    });

    QUnit.test('Edit meme', async (assert)=>{
            let path = `data/meme/${lastCreatedMemeId}`;

            meme.title = 'Edited title';
            meme.description = 'Edited desription';

            //act
        let response = await fetch(baseUrl + path, {
            method : 'PUT',
            headers : { 
                'content-type' : 'application/json',
                'X-Authorization' : token
             },
            body : JSON.stringify(meme)
        });
        

        assert.ok(response.ok, "successful response");
        let json = await response.json();
        console.log(json); 

        //assert
        assert.ok(json.hasOwnProperty('description'), 'Meme property "desciption" exists');
        assert.strictEqual(typeof json.description, 'string', 'Property description is string');
        assert.equal(json.description, meme.description, 'Expected description');
        
        assert.ok(json.hasOwnProperty('imageUrl'), 'Meme property "imageUrl" exists');
        assert.strictEqual(typeof json.imageUrl, 'string', 'Property imageUrl is string');
        assert.equal(json.imageUrl, meme.imageUrl, 'Expected imageUrl');

        assert.ok(json.hasOwnProperty('title'), 'Meme property "title" exists');
        assert.strictEqual(typeof json.title, 'string', 'Property title is string');
        assert.equal(json.title, meme.title, 'Expected title');
        
        assert.ok(json.hasOwnProperty('_createdOn'), 'Meme property "_createdOn" exists');
        assert.strictEqual(typeof json._createdOn, 'number', 'Property _createdOn is string');
        
        assert.ok(json.hasOwnProperty('_id'), 'Meme property "_id" exists');
        assert.strictEqual(typeof json._id, 'string', 'Property _id is string');

        assert.ok(json.hasOwnProperty('_ownerId'), 'Meme property "_ownerId" exists');
        assert.strictEqual(typeof json._ownerId, 'string', 'Property _ownerId is string');

        assert.ok(json.hasOwnProperty('_updatedOn'), 'Meme property "_updatedOn" exists');
        assert.strictEqual(typeof json._updatedOn, 'number', 'Property _updatedOn is string');

        lastEditedMemeId = json._id;
    });

    QUnit.test('Delete meme', async (assert)=>{
        let path = `data/meme/${lastEditedMemeId}`;

        let response = await fetch(baseUrl + path, {
            method: 'DELETE',
            headers: {
                'X-Authorization' : token
            }
        });

        let json = await response.json();
        assert.ok(response.ok, 'response is successful');
        console.log(json);

        assert.ok(json.hasOwnProperty('_deletedOn'), 'Response has property "_deletedOn"');
        assert.strictEqual(typeof json._deletedOn, 'number', 'Response property "_deletedOn" a number')

    });
});


