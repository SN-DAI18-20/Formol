// This file will exposes the worker named 'formol_eventstream'.
const Worker = require('bullmq').Worker;

const redisConn = require('../conn');
const tasks = require('../tasks');

// Example of how to create the worker
// const worker = new Worker(
//     'queue_name',
//     {
//         connection: redisConn,
//     },
//     async job => {
//         if (job.name === 'bla') {
//             await paintCar(job.data.color);
//         }
//     }
// );

// module.exports = worker;
const worker = new Worker("queueName",
    {connection:redisConn},
    async job =>{
     // we dont have enough information to do this 
     // part  
     // code comming soon
    }
);
module.exports = worker;
