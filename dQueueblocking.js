var comsumer  = require("./index").consumer
var producervar = require("./index").producer

async function consumeKafka() {
    await comsumer.connect()
    await comsumer.subscribe({ topic: 'applicationtopic' })
    await comsumer.run({
        // this function is called every time the consumer gets a new message
        eachMessage: async ({ topic, partition, message }) => {
            console.log("111111111111111")
            console.log(message)
            let messageData = JSON.parse(message.value.toString())
            
            console.log(messageData)
            console.log("Now Pausing")
            console.log("Checking partition", partition);
            
            let delay = parseInt(messageData.delay)

            console.log("Checking delay here \n\n\n\n\n", delay)
            
            comsumer.pause([{topic: 'retryqueue', partitions: [0]}])

            let ms = 1000;
            let d = delay * ms
            Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, d);

            
            console.log("Now resuming")
            comsumer.resume([{topic: 'retryqueue', partitions: [0]}])
            let retryCount = parseInt(messageData['retryCount'])
            if(retryCount > 0) {
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
            } else {
                console.log("Retry Exhausted \n\n")
            }
            
        }
    })
}


consumeKafka()