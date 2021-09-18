function timeOut(resolve, func, ms){
    // console.log("resolved: ", resolve)
    return setTimeout(()=>{
        func();
        resolve();
    },ms)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}