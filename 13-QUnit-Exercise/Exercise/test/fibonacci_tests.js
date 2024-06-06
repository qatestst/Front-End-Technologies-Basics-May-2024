const {fibonacci} = require("../test_functions.js");

QUnit.module("Test function fibonacci", function(){
    QUnit.test("The function returns an empty array when the parameter is 0", function(assert){
        assert.deepEqual(fibonacci(0), [], "input 0, output empty array")
    })

    QUnit.test("The function returns an array with one element, when the parameter is 1", function(assert){
        assert.deepEqual(fibonacci(1), [0], "input 1, output array with one element")
    })

    QUnit.test("Check the returned array when 5 is given as parameter", function(assert){
        assert.deepEqual(fibonacci(5), [0,1,1,2,3], "input 5, output [0,1,1,2,3]")
    })

    QUnit.test("Check the returned array when 10 is given as parameter", function(assert){
        assert.deepEqual(fibonacci(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], "input 10, output [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]")
    })



})