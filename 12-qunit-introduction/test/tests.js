import { add } from "../add.js";
import { substract } from "../add.js";

QUnit.module("add");

QUnit.test('add function test', function(assert){
    assert.equal(add(1,1), 2, '1+1 should equal 2')
    assert.equal(add(-1,1), 0, '-1+1 should equal 0')
    assert.equal(add(0,0), 0, '0+0 should equal 0')
});

QUnit.module("Math operations", {
    beforeEach: function(){
        //execute code before each test
    },
    afterEach: function(){
        // execute code after each test
    }

}, function(){
    QUnit.test("add test", function(assert){
        assert.equal(add(1,2), 3, "1+2 should equal 3")
    }),
    QUnit.test("substraction test", function(assert){
        assert.equal(substract(2,2), 0, "2-2 should equal 0")
    })

});

QUnit.module("Assertion tests");
QUnit.test('ok() assertion method', function(assert){
    assert.ok(1, "Number 1 is true");
    assert.ok('non empty srting Hello is true');
})

QUnit.test("not Ok() assertion method", function(assert){
    assert.notOk(0, "Zero is false - notOK");
    assert.notOk("", "Empty string is false - not OK");
   
})

QUnit.test("throws() assertion method", function(assert){
    function throwError(){throw new Error("Error!"); }
    assert.throws(function(){throwError();}, /Error!/, "function should throws error");
})

QUnit.test("equal() assertion method", function(assert){
    assert.equal(1, '1', '1 == 1 to be true'); // sravnqva samo po stoinost t.e ==

})

QUnit.test("strictEqual() assertion method", function(assert){
    assert.strictEqual(1, 1, '1 === 1 to be true'); // sravnqva tipa danni i stoinostta t.e ===
    
})

QUnit.test("deepEqual() assertion method", function(assert){
    let obj1 = {a:1, b:2};
    let obj2 = {a:1, b:2};
    assert.deepEqual(obj1, obj2, "obj1 should be equal to obj2");; //sravnqva obekti i tehnite stoinosti 
})

QUnit.test("notDeepEqual() assertion method", function(assert){
    let obj1 = {a:1, b:2};
    let obj2 = {a:1, b:3};
    assert.notDeepEqual(obj1, obj2, "obj1 should not be equal to obj2");; //sravnqva obekti i tehnite stoinosti 
})


QUnit.test('asynchronous test example', function(assert) {
    var done = assert.async();
    setTimeout(function() {
    assert.ok(true, 'asynchronous test passed');
    done();
    }, 2000);
   });
   

