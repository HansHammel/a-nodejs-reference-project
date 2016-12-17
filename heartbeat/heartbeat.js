/*
 if (port) {
   process.env.PORT = port;
   util.log('will monitor port ' + port + ' for heartbeat');

   setTimeout(function () {
     setInterval(function () {
       var request = http.get('http://localhost:' + port, function (res) {
         request.setTimeout(0); // disable timeout on response.
         if ([200, 302].indexOf(res.statusCode) == -1) {
           reloadCluster('[heartbeat] : FAIL with code ' + res.statusCode);
         } else {
           util.log(' [heartbeat]:  OK [' + res.statusCode + ']');
         }
       })
        .on('error', function (err) {
          reloadCluster(' [heartbeat]:  FAIL with ' + err.message);
        });

       request.setTimeout(10000, function () {
          // QZ: This is an agressive reload on first failure. Later, we may change it
          // to reload on n consecutive failures
         reloadCluster(' [heartbeat]: FAIL with timeout ');
       });
     }, heartbeatInterval);
   }, startupDelay);
 }
*/