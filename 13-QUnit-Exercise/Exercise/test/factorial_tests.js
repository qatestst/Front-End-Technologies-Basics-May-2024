const {factorial} = require("../test_functions.js");

QUnit.module("Test factorial funuction", function(){
    QUnit.test("The function returns 120 when the parameter is 5", function(assert){
        assert.equal(factorial(5), 120, "input 5 output 120")
    })

    QUnit.test("The function returns 1 when the parameter is 0", function(assert){
        assert.equal(factorial(0), 1, "returns 1 when 0 is input")
    })
    
    QUnit.test("The function returns 1 when the parameter is -1", function(assert){
        assert.equal(factorial(-1), 1, "returns 1 when -1 is input")
    })

})