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

    });

    QUnit.test('Edit meme', async (assert)=>{

    });

    QUnit.test('Delete meme', async (assert)=>{

    });
});


