function promiseWithMultipleHandlers() {
    let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Hello World!")
        }, 2000)
    })

    // for (i = 1; i <= 2; i++) {

    //     promise.then(function (result) {
    //         console.log(result);
            
    //     })
    // }

    promise.then(function(result){
        console.log(result);
        return result;
    })
    .then(function(result){
        console.log(result);
    })

}