const kafkaServer = { kafkaHost: 'localhost:9092'};
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(kafkaServer),
    consumer = new Consumer(
        client,
        [
            { topic: 'aadharMaskingQueue', partitions: 0 }, { topic: 'faceRecognitionQueue', partitions: 1 }, { topic: 'thumbnailCreationQueue', partitions: 2 }
        ],
        {
            autoCommit: true
        }
    );


console.log("REACHED HERE")
console.log(kafka)



client.on('ready',() => {
    console.log(`kclient ready`);
    kconsumer = new Consumer(client,[{
        topic:'aadharMaskingQueue',
        partition:0
    }]);
    kconsumer.on('error',(err) => {
        console.error(` in kconsumer: \n${err}\n`)
    })
    kconsumer.on('ready',() => {
        console.log(`kconsumer ready`);
        kconsumer.on('message',(msg) => {
            console.log(`recived msg: ${msg}`);
        })

    })

})





consumer.on('message', function (message) {
    console.log(message);
});


consumer.on('error', function (err) {
    console.log(err)
})