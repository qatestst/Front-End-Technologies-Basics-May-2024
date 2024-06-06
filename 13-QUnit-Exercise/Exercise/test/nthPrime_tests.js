const {nthPrime} = require("../test_functions.js");

QUnit.module("Test function nthPrime", function(){
    QUnit.test("The function returns 2 when the parameter is 1", function(assert){
        assert.equal(nthPrime(1),2, "input 1 result 2")
    })

    QUnit.test("The function returns 11 when the parameter is 5", function(assert){
        assert.equal(nthPrime(5),11, "input 5 result 11")
    })

    QUnit.test("The function returns 31 when the parameter is 11", function(assert){
        assert.equal(nthPrime(11),31, "input 11 result 31")
    })


})