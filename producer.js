var producervar = require("./index").producer


async function pushToKafkaQueue() {

    console.log("Reachig 1")
    await producervar.connect()
    
    console.log("Reachig 2")
    await producervar.send({
        topic:'applicationtopic',
        messages: [
            {
                key: "pdf2",
                value: JSON.stringify({
                    'id': 1,
                    'name': 'Vishal Pandey',
                    'error': true,
                    'delay': 60,
                    'retryCount': 1
                }),
                partition: 0
            },
        ],
    })
    console.log("Reachig 3")


    // await producervar.send({
    //     topic:'retryqueue',
    //     messages: [
    //         {
    //             key: "pdf1",
    //             value: JSON.stringify({
    //                 'id': 1,
    //                 'name': 'Vishal Pandey',
    //                 'error': true,
    //                 'delay': 4,
    //                 'retryCount': 3
    //             }),
    //             partition: 0
    //         },
    //     ],
    // })

    // console.log("Reaching 4")
}

pushToKafkaQueue()