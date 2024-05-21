async function promiseRejectionAsync() {
   let promise = new Promise(function (resolve, reject) {
      setTimeout(function () {
         reject(new Error("This is promise rejecton Error!"))
      }, 1000)
   })

   try {
      await promise;
   }
   catch (err) {
      console.log(err);
   }

}