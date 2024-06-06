const {isPerfectSquare} = require("../test_functions.js");

QUnit.module("Test function isPerfectSquare", function(){
    QUnit.test("Check with input parameters 1, 4, 9, 16 should return true", function(assert){
        assert.ok(isPerfectSquare(1), "input 1 result true")
        assert.ok(isPerfectSquare(4), "input 4 result true")
        assert.ok(isPerfectSquare(9), "input 9 result true")
        assert.ok(isPerfectSquare(16), "input 16 result true")
    })

    QUnit.test("Check with input parameters 2 and 15 should return false", function(assert){
        assert.notOk(isPerfectSquare(2), "input 2 result false")
        assert.notOk(isPerfectSquare(15), "input 15 result false")
        
    })


})