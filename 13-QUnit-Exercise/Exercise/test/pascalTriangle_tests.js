const {pascalsTriangle} = require("../test_functions.js");

QUnit.module("Tests function pascalsTriangle", function(){
    QUnit.test("The function returns an empty jagged array when the parameter is 0", function(assert){
        assert.deepEqual(pascalsTriangle(0), [], "returns an empty jagged array when the parameter is 0")
    })

    QUnit.test("The function returns a jagged array with value [[1]] when given parameter is 1", function(assert){
        assert.deepEqual(pascalsTriangle(1), [[1]], "returns a jagged array with value [[1]] when given parameter is 1")
    })

    QUnit.test("The function returns a jagged array with value [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]] when given parameter is 5", function(assert){
        assert.deepEqual(pascalsTriangle(5), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]], "returns a jagged array with value [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]] when given parameter is 5")
    })


    QUnit.test("•	The function returns a jagged array with value [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1]] when given parameter is 8", function(assert){
        assert.deepEqual(pascalsTriangle(8), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1]], "returns a jagged array with value [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1]] when given parameter is 8")
    })


})