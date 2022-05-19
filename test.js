console.log('start')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let index = 0; index < 10; index++) {
        await sleep(index * 1000)
        console.log(`Waiting for ${index} Seconds`)
    }
    console.log("Done")
} 


demo()

console.log("Here we are checking")