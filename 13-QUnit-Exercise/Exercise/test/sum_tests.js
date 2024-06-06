const { sum } =  require("../test_functions.js");

QUnit.module('Test function sum', function(){
   
    QUnit.test('Adding two positive numbers 1+1=2', function(assert){
        assert.equal(sum(1,1),2, "1+1 should equal 2")
    })

  
    QUnit.test("Adding negative and positive numbers -5 + 8 = 3", function(assert){
        assert.equal(sum(-5,8),3, "-5 + 8 should equal 3")
    })

    QUnit.test("Adding two negative numbers -5 -6 should equal -11", function(assert){
        assert.equal(sum(-5,-6),-11, "-5 -6 should equal -11")
    })

    QUnit.test("Adding floating-point  numbers (0.1 + 0.2) * 10 should equal 3", function(assert){
        assert.equal(Math.floor(sum(0.1,0.2)*10), 3, "(0.1 + 0.2) * 10 should equal 3")
    })

    



});



