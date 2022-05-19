var Group1consumerVar  = require("./index").Group2consumer


async function consumeKafka() {
    await Group1consumerVar.connect()
    await Group1consumerVar.subscribe({ topic: 'retryqueue' })
    await Group1consumerVar.run({
        // this function is called every time the consumer gets a new message
        eachMessage: ({ message, heartbeat }) => {
            console.log
            console.log("111111111111111 TimeStamp")
            console.log(message.timestamp)
            let messageData = JSON.parse(message.value.toString())
            console.log(messageData)
            console.log("Now Pausing")
            Group1consumerVar.pause([{topic: 'retryqueue'}])

            setTimeout(()=>{
                console.log("Now resuming")
            }, 10000)
            
            // Group2consumerVar.pause({topic: 'retryqueue'})
            // Group2consumerVar.resume()
        }
    })
}


consumeKafka()