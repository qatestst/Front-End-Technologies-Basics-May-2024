const {isPalindrome} = require("../test_functions.js");

QUnit.module("Test function isPalindrome", function(){
    QUnit.test("The function returns true when the parameter is 'racecar'.", function(assert){
        assert.ok(isPalindrome("racecar"), "input racecar, output true")
    })

    QUnit.test("The function returns true when the parameter is 'A man, a plan, a canal, Panama!'.", function(assert){
        assert.ok(isPalindrome("A man, a plan, a canal, Panama!"), "input 'A man, a plan, a canal, Panama!', output true")
    })
    
    QUnit.test("The function returns false when the parameter is 'hello'.", function(assert){
        assert.notOk(isPalindrome("hello"), "input 'hello', output false")
    })

    QUnit.test("•	The function returns false when the parameter is an empty string.", function(assert){
        assert.notOk(isPalindrome(""), "input empty string, output false")
    })
})
