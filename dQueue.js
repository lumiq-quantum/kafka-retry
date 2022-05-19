var comsumer  = require("./index").consumer
var producervar = require("./index").producer

async function consumeKafka() {
    await comsumer.connect()
    await comsumer.subscribe({ topic: 'retryqueue', fromBeginning: false })
    await comsumer.run({
        // this function is called every time the consumer gets a new message
        eachMessage: async ({ topic, partition, message }) => {
            console.log("111111111111111")

            
            let messageData = JSON.parse(message.value.toString())
            console.log(messageData)
            let retryCount = parseInt(messageData['retryCount'])
            let delay = parseInt(messageData['delay'])

            if (retryCount === 0) {
                console.log("Retry Exhausted \n\n")
                return
            }
            
            console.log("Now Pausing")
            comsumer.pause([{topic: 'retryqueue', partitions: [0]}])

            setTimeout(async ()=>{
                messageData['retryCount'] = retryCount - 1
                await producervar.connect()

                // Doubling the retry time delay
                messageData['delay'] = messageData['delay'] * 2

                await producervar.send({
                    topic:'applicationtopic',
                    messages: [
                        {
                            key: "pdf",
                            value: JSON.stringify(messageData),
                            partition: 0
                        },
                    ],
                })

                console.log("Now resuming")
                comsumer.resume([{topic: 'retryqueue', partitions: [0]}])
                
            }, delay * 1000)
            
        }
    })
}


consumeKafka()