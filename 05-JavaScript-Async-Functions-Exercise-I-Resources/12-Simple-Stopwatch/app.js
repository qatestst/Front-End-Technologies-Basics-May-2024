let stopwatchSeconds = 0;
let stopwatchIntervals;
let savedTimeInterval;

function startStopwatch(){
    stopwatchIntervals = setInterval(function(){
        stopwatchSeconds++
        console.log("Elapsed time: " + stopwatchSeconds + " seconds");
    }, 1000);

    savedTimeInterval = setInterval(async function(){
        await saveTime(stopwatchSeconds);
    }, 5000)
}

function stopStopwatch(){
    clearInterval(stopwatchIntervals)
    clearInterval(savedTimeInterval)

    stopwatchSeconds = 0;
}

function saveTime(saveTime){
    return new Promise(function(resolve, reject){
        console.log("Saved time: " + saveTime + " seconds");
        resolve();
    })
}
