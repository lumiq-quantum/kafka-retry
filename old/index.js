const kafkaServer = { kafkaHost: 'localhost:9092'};
var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient(kafkaServer),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message'),
    payloads = [
        { topic: 'aadharMaskingQueue', messages: 'hi', partition: 0 },
        { topic: 'faceRecognitionQueue', messages: ['hello', 'world', km] },
        { topic: 'thumbnailCreationQueue', messages: ['hello', 'world', km] }
    ];
producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log("Reaching here")
        console.log(err)
        if(err) {
            console.log(err)
        }
        console.log(data);
    });
});
 
producer.on('error', function (err) {})

