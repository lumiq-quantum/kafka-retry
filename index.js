const { Kafka, logLevel } = require("kafkajs")
const brokers = ['localhost:9092']
const { Partitioners } = require('kafkajs')


const clientId = "test"
const username = process.env.KAFKA_USERNAME || ''
const password = process.env.KAFKA_PASSWORD || ''
const passwordCheck = process.env.KAFKA_PASSWORD ? true : false

const kafkaClient = new Kafka({ 
    clientId, brokers, 
    ssl: false,
    logLevel: logLevel.INFO
})

const consumer = kafkaClient.consumer({ groupId: "myGroup1", fromBeginning: true })
const consumer2 = kafkaClient.consumer({ groupId: "testGroup2", fromBeginning: true })

const producer = kafkaClient.producer({ 
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
})
const admin = kafkaClient.admin()



// admin.createTopics({
//     waitForLeaders: true,
//     topics: [
//         { topic: 'applicationtopic' },
//         { topic: '**',replicationFactor: '3**'}
//     ],
// })

// admin.createTopics({
//     waitForLeaders: true,
//     topics: [
//         { topic: 'retryqueue' },
//         { topic: '**',replicationFactor: '3**'}
//     ],
// })


module.exports = {
    clientId: clientId,
    kafka: kafkaClient,
    brokers: brokers,
    producer: producer,
    consumer: consumer,
    consumer2: consumer2,
    admin: admin
};
