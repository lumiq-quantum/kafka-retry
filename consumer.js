var consumer  = require("./index").consumer
var consumer2  = require("./index").consumer2
var producervar = require("./index").producer

async function consumeKafka() {
    await consumer2.connect()
    await consumer2.subscribe({ topic: 'applicationtopic', fromBeginning: false })
    await consumer2.run({
        // this function is called every time the consumer gets a new message
        eachMessage: async ({ message }) => {
            console.log("111111111111111")
            console.log(message)
            let messageData = JSON.parse(message.value.toString())
            console.log(messageData)

            let delayTill = message.timestamp + parseInt(messageData.delay)
            messageData['delayTill'] = delayTill;
            
            if(messageData.error) {
                producervar
                await producervar.connect()
    
                await producervar.send({
                    topic:'retryqueue',
                    messages: [
                        {
                            key: "pdf",
                            value: JSON.stringify(messageData),
                            partition: 0
                        },
                    ],
                })
            }
        }
    })
}


consumeKafka()