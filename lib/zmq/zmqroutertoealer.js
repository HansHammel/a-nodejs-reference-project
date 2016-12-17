'use strict';

const cluster = require('cluster');
const zmq = require('zmq');

const NBR_WORKERS = 3;

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomString () {
  const source = 'abcdefghijklmnopqrstuvwxyz';
  let target = [];

  for (let i = 0; i < 20; i++) {
    target.push(source[randomBetween(0, source.length)]);
  }
  return target.join('');
}

function workerTask () {
  const dealer = zmq.socket('dealer');
  dealer.identity = randomString();

  dealer.connect('tcp://localhost:5671');

  let total = 0;

  const sendMessage = function () {
    dealer.send(['', 'Hi Boss']);
  };

    //  Get workload from broker, until finished
  dealer.on('message', function onMessage () {
    const args = Array.apply(null, arguments);

    const workload = args[1].toString('utf8');

    if (workload === 'Fired!') {
      console.log('Completed: ' + total + ' tasks (' + dealer.identity + ')');
      dealer.removeListener('message', onMessage);
      dealer.close();
      return;
    }
    total++;

    setTimeout(sendMessage, randomBetween(0, 500));
  });

    //  Tell the broker we're ready for work
  sendMessage();
}

function main () {
  const broker = zmq.socket('router');
  broker.bindSync('tcp://*:5671');

  let endTime = Date.now() + 5000;
  let workersFired = 0;

  broker.on('message', function () {
    const args = Array.apply(null, arguments);
    const identity = args[0];
    const now = Date.now();

    if (now < endTime) {
      broker.send([identity, '', 'Work harder']);
    } else {
      broker.send([identity, '', 'Fired!']);
      workersFired++;
      if (workersFired === NBR_WORKERS) {
        setImmediate(function () {
          broker.close();
          cluster.disconnect();
        });
      }
    }
  });

  for (let i = 0; i < NBR_WORKERS; i++) {
    cluster.fork();
  }
}

if (cluster.isMaster) {
  main();
} else {
  workerTask();
}
