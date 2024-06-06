const { assert } = require("qunit")
const {isEven} = require("../test_functions.js")

QUnit.module("Test isEven function", function(){
    QUnit.test("The function returns true when an even number 2 is given as a parameter", function(assert){
        assert.ok(isEven(2), "even number passes")
        assert.ok(isEven(100), "even number passes")
        assert.ok(isEven(234), "even number passes")
    })

    QUnit.test("The function returns false when an odd number 5 is given as a parameter", function(assert){
        assert.notOk(isEven(5), "odd number fails")
        assert.notOk(isEven(55), "odd number fails")
        assert.notOk(isEven(112345), "odd number fails")
    })

    QUnit.test("The function returns true when zero is given as a parameter", (assert) =>  {
        assert.ok(isEven(0), "Zero is True")
    })

    // test with negative pameters
    
    QUnit.test("The function returns true when an even negative  number 2 is given as a parameter", function(assert){
        assert.ok(isEven(-2), "even number passes")
        assert.ok(isEven(-23456), "even number passes")
        assert.ok(isEven(-100), "even number passes")
    })

    QUnit.test("The function returns false when an odd negative number 5 is given as a parameter", function(assert){
        assert.notOk(isEven(-5), "odd number fails")
        assert.notOk(isEven(-5347), "odd number fails")
        assert.notOk(isEven(-903), "odd number fails")
    })


    QUnit.test("Test with string should return false", function(assert){
        assert.notOk(isEven("der"))
        assert.notOk(isEven("111scf11"))
    })

    QUnit.test("Test with undefined, Nan, empty should return false", function(assert){
        assert.notOk(isEven(undefined))
        assert.notOk(isEven())
        assert.notOk(isEven(NaN))
    })

})