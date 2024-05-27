function multiplePromises() {
      const p1 = new Promise(resolve => setTimeout(()=>resolve('Promise 1 resolved'), 1000));
      const p2 = new Promise(resolve => setTimeout(()=>resolve('Promise 2 resolved'), 2000));
      const p3 = new Promise(reject => setTimeout(()=>reject('Promise 3 rejected'), 3000));

      Promise.allSettled([p1, p2, p3]).then(results=> {
            results.forEach(result => console.log(result.status, result.value || result.reason));
      })   
}

async function multiplePromisesAsyncAwait() {
      const p1 = new Promise(resolve => setTimeout(()=>resolve('Promise 1 resolved'), 1000));
      const p2 = new Promise(resolve => setTimeout(()=>resolve('Promise 2 resolved'), 2000));
      const p3 = new Promise(reject => setTimeout(()=>reject('Promise 3 rejected'), 3000));

      const results = await Promise.allSettled([p1, p2, p3]);
      results.forEach(result => console.log(result.status, result.value || result.reason));


}