const zmq = require('zmq');

const WORKERS_NUM = 10;
const router = zmq.socket('router');

const d = new Date();
const endTime = d.getTime() + 5000;

router.bindSync('tcp://*:9000');

router.on('message', function () {
    // get the identity of current worker
  const identity = Array.prototype.slice.call(arguments)[0];
  const d = new Date();
  const time = d.getTime();
  if (time < endTime) {
    router.send([identity, '', 'Work harder!']);
  } else {
    router.send([identity, '', 'Fired!']);
  }
});

// To keep it simple we going to use
// workers in closures and tcp instead of
// node clusters and threads

for (let i = 0; i < WORKERS_NUM; i++) {
  (function () {
    const worker = zmq.socket('req');

    worker.connect('tcp://127.0.0.1:9000');

    let total = 0;
    worker.on('message', function (msg) {
      const message = msg.toString();
      if (message === 'Fired!') {
        console.log('Completed %d tasks', total);
        worker.close();
      }
      total++;

      setTimeout(function () {
        worker.send('Hi boss!');
      }, 1000);
    });

    worker.send('Hi boss!');
  })();
}
